<script>
    import { goto } from '$app/navigation'
    import { getContext } from 'svelte'

    import Form from '../../lib/Form.svelte'
    import { decode } from '../../lib/general'
    import { url } from '../../lib/variables'

    let types = [
        { type: 'bar', text: 'Bar' },
        { type: 'discoteca', text: 'Discoteca' },
        { type: 'pub', text: 'Pub' }
    ]

    let userType = getContext('userType')

    let type = 'login'
    let login = { credential: '', password: '' }
    let signupManager = {
        localName: '',
        email: '',
        address: { country: '', city: '', street: '', number: undefined, cap: '' },
        localType: '',
        photos: []
    }
    let signupParticipant = {
        name: '',
        surname: '',
        username: '',
        email: '',
        birthDate: undefined
    }

    let error = { type: '', message: '' }
    let message = ''

    async function sendRequest() {
        if (type === 'login') {
            try {
                let res = await fetch(url + '/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(login)
                })
                if (res.status === 200) {
                    let json = await res.json()

                    if (!json.success) {
                        error.type = 'login'
                        error.message = json.message
                    } else {
                        let token = json.token
                        localStorage.setItem('token', token)
                        userType.set(decode(token).type)
                        goto('/')
                    }
                } else if (res.headers.get('content-type').includes('application/json')) {
                    let json = await res.json()

                    error.type = 'login'
                    error.message = json.message
                } else {
                    error.type = 'login'
                    error.message = 'Internal Error'
                }
            } catch (e) {
                error.type = 'login'
                error.message = e.toString()
            }
        } else if (type === 'participant') {
            let [year, month, day] = signupParticipant.birthDate.split('-').map((s) => parseInt(s))

            let birthDate = { year, month, day }

            try {
                let res = await fetch(url + '/users/signup-user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ...signupParticipant,
                        birthDate,
                        sendEmail: true,
                        linkConfermation: window.location.origin + '/conferma-email'
                    })
                })

                if (res.status === 200) {
                    let json = await res.json()

                    if (!json.success) {
                        error.type = 'participant'
                        error.message = json.message
                    } else {
                        type = login
                        message =
                            'La registrazione è andata a buon fine, ti è stata inviata una email di conferma. Nel frattempo effetua il login.'
                        signupParticipant = {}
                    }
                } else if (res.headers.get('content-type').includes('application/json')) {
                    let json = await res.json()

                    error.type = 'participant'
                    error.message = json.message
                } else {
                    error.type = 'participant'
                    error.message = 'Internal Error'
                }
            } catch (e) {
                error.type = 'participant'
                error.message = e.toString()
            }
        } else if (type === 'manager') {
            try {
                const formData = new FormData()

                formData.append('localName', signupManager.localName)
                formData.append('email', signupManager.email)
                formData.append('sendEmail', 'true')
                formData.append('linkConfermation', window.location.origin + '/conferma-email')
                formData.append('address', JSON.stringify(signupManager.address))
                formData.append('localType', signupManager.localType)

                for (let image of signupManager.photos) {
                    formData.append('photos', image)
                }

                let res = await fetch(url + '/users/signup-manager', {
                    method: 'POST',
                    body: formData
                })

                if (res.status === 200) {
                    let json = await res.json()

                    if (!json.success) {
                        error.type = 'manager'
                        error.message = json.message
                    } else {
                        signupManager = {}
                        message =
                            'La tua inscrizione è stata presa in considerazione, conferma il tuo indirizzo email e in seguito verrai ricontattato'
                    }
                } else if (res.headers.get('content-type').includes('application/json')) {
                    let json = await res.json()

                    error.type = 'manager'
                    error.message = json.message
                } else {
                    error.type = 'manager'
                    error.message = 'Internal Error'
                }
            } catch (e) {
                error.type = 'manager'
                error.message = e.toString()
            }
        }
    }
</script>

<svelte:head>
    <title>TrentEvent - Accesso</title>
</svelte:head>
<div class="container">
    <div class="selection">
        <button
            class={type === 'login' ? 'active' : ''}
            on:click={() => {
                type = 'login'
                message = ''
            }}>Login</button
        >
        <button
            class={type === 'participant' ? 'active' : ''}
            on:click={() => {
                type = 'participant'
                message = ''
            }}>Sign up Utente</button
        >
        <button
            class={type === 'manager' ? 'active' : ''}
            on:click={() => {
                type = 'manager'
                message = ''
            }}>Sign up Gestore eventi</button
        >
    </div>

    {#if message}
        <p name="message">{message}</p>
    {/if}

    <Form on:submit={sendRequest}>
        {#if type === 'login'}
            <div>
                <p>Log in</p>
                {#if error.type === 'login'}
                    <p name="error">{error.message}</p>
                {/if}
                <input
                    type="text"
                    required
                    placeholder="Username o Email"
                    bind:value={login.credential}
                />
                <input
                    type="password"
                    required
                    placeholder="Password"
                    bind:value={login.password}
                />
                <a href="#">Credenziali dimenticate?</a>
            </div>
        {:else if type === 'manager'}
            <div>
                <p>Registrati come Gestore Eventi</p>
                {#if error.type === 'manager'}
                    <p name="error">{error.message}</p>
                {/if}
                <input
                    type="text"
                    required
                    placeholder="Nome del Locale"
                    bind:value={signupManager.localName}
                />
                <input type="email" required placeholder="Email" bind:value={signupManager.email} />
                <select required bind:value={signupManager.localType}>
                    <option value="" hidden default>Tipo di Locale</option>
                    {#each types as type}
                        <option value={type.type}>{type.text}</option>
                    {/each}
                </select>
                <input
                    type="text"
                    required
                    placeholder="Stato"
                    bind:value={signupManager.address.country}
                />
                <input
                    type="text"
                    required
                    placeholder="Città"
                    bind:value={signupManager.address.city}
                />
                <input
                    type="text"
                    required
                    placeholder="Via"
                    bind:value={signupManager.address.street}
                />
                <input
                    type="number"
                    required
                    placeholder="Numero"
                    bind:value={signupManager.address.number}
                />
                <input
                    type="text"
                    required
                    placeholder="CAP"
                    bind:value={signupManager.address.cap}
                />
                <input type="file" multiple bind:files={signupManager.photos} />
            </div>
        {:else}
            <div>
                <p>Registrati come Utente</p>
                {#if error.type === 'participant'}
                    <p name="error">{error.message}</p>
                {/if}
                <input
                    type="text"
                    required
                    placeholder="Nome"
                    bind:value={signupParticipant.name}
                />
                <input
                    type="text"
                    required
                    placeholder="Cognome"
                    bind:value={signupParticipant.surname}
                />
                <input
                    type="text"
                    required
                    placeholder="Username"
                    bind:value={signupParticipant.username}
                />
                <input
                    type="email"
                    required
                    placeholder="Email"
                    bind:value={signupParticipant.email}
                />
                <input
                    type="password"
                    required
                    placeholder="Password"
                    bind:value={signupParticipant.password}
                />
                <label for="birthDate">Data di nascita</label>
                <input
                    name="birthDate"
                    type="date"
                    required
                    bind:value={signupParticipant.birthDate}
                />
            </div>
        {/if}
        <button type="submit">Submit</button>
    </Form>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: 100px;
        align-items: center;
        padding: 3em 0;
        min-height: calc(100% - 6em);
        height: fit-content;
        font-family: 'Montserrat', sans-serif;
    }

    .selection {
        display: flex;
        gap: 1em;
    }

    .selection button {
        color: #fff;
        background: rgba(255, 255, 255, 0.3);
        backdrop-filter: blur(10px);
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.3);
        box-shadow: 10px 10px 60px -8px rgba(0, 0, 0, 0.2);
        padding: 1em;
        transition: background-color 0.3s ease-in-out;
    }

    .selection button:hover:not(.active) {
        background: rgba(255, 255, 255, 0.1);
        box-shadow: 4px 4px 60px 8px rgba(0, 0, 0, 0.2);
        cursor: pointer;
    }

    .selection .active {
        background: #ffc83cc4;
    }
</style>
