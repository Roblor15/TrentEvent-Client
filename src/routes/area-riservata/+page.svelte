<script>
    import { getContext } from 'svelte'
    import Form from '../../lib/Form.svelte'
    import { convertDate } from '../../lib/general'
    import { url } from '../../lib/variables'

    let userType = getContext('userType')

    let password = {
        old: undefined,
        new: undefined,
        newConfermed: undefined
    }

    let formError
    let formMessage
    async function changePassword() {
        if (password.new !== password.newConfermed) {
            formError = 'Le password inserite sono diverse'
            return
        }

        try {
            let res = await fetch(url + '/users/password', {
                method: 'PUT',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ newPassword: password.new, oldPassword: password.old })
            })

            if (res.status === 200) {
                let json = await res.json()
                if (json.success) {
                    formError = ''
                    formMessage = 'Password cambiata'
                    password = {}
                    return
                } else {
                    formError = json.message
                    formMessage = ''
                    return
                }
            }
            if (res.status === 501) {
                let json = await res.json()
                formError = json.message

                return
            }

            formError = 'Comunicazione fallita'
        } catch (e) {
            formMessage = ''
            formError = e.message
        }
    }

    async function getInfos() {
        try {
            let res = await fetch(url + '/users/my-infos', {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
            })

            if (res.status === 200) {
                let json = await res.json()
                if (json.success) {
                    return json.infos
                }
            }

            throw new Error('Errore di comunicazione con i server')
        } catch (e) {
            throw new Error('Errore di comunicazione con i server')
        }
    }

    let promiseInfos = getInfos()
</script>

<div class="container">
    {#if $userType === 'Participant'}
        {#await promiseInfos then infos}
            <div class="container-dati">
                <div class="dati">
                    <h1>I miei dati</h1>
                    <div>
                        <div>
                            <h2>Nome</h2>
                            <span>{infos.mame}</span>
                        </div>
                        <div>
                            <h2>Cognome</h2>
                            <span>{infos.surname}</span>
                        </div>
                        <div>
                            <h2>Username</h2>
                            <span>{infos.username}</span>
                        </div>
                        <div>
                            <h2>Email</h2>
                            <span>{infos.email}</span>
                            <span class="verified" class:yes={infos.verifiedEmail}>
                                [{!infos.verifiedEmail ? 'not ' : ''}verified]</span
                            >
                        </div>
                        <div>
                            <h2>Data di Nascita</h2>
                            <span>{convertDate(infos.birthDate)}</span>
                        </div>
                    </div>
                </div>
                <Form on:submit={changePassword}>
                    <p>Cambia password</p>
                    {#if formError}
                        <p name="error">{formError}</p>
                    {/if}
                    <input
                        type="password"
                        required
                        placeholder="Vecchia password"
                        bind:value={password.old}
                    />
                    <input
                        type="password"
                        required
                        placeholder="Nuova password"
                        bind:value={password.new}
                    />
                    <input
                        required
                        class:different={password.new !== password.newConfermed}
                        type="password"
                        placeholder="Nuova password"
                        bind:value={password.newConfermed}
                    />
                    {#if formMessage}
                        <p name="message">{formMessage}</p>
                    {/if}
                    <button type="submit">Cambia</button>
                </Form>
            </div>
        {:catch error}
            <p style="color: red;">{error.message}</p>
        {/await}
    {:else}
        <p style="color: red;">Non sei autorizzato</p>
    {/if}
</div>

<style>
    .container {
        margin: 4em 0;
        display: flex;
        justify-content: center;
    }

    .container-dati {
        display: flex;
        justify-content: space-around;
    }

    .different {
        color: red;
    }

    .dati {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    h1 {
        color: #ff781e;
    }

    .dati h2 {
        color: #ffcd49;
    }

    .dati span {
        color: #fcfcfc;
    }

    .dati .verified {
        color: red;
    }

    .dati .verified.yes {
        color: green;
    }

    .container-dati {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
</style>
