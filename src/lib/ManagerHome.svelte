<script>
    import { goto } from '$app/navigation'

    import Event from './Event.svelte'
    import Form from './Form.svelte'
    import { url } from './variables'

    export let isSupervisor = false
    export let isManager = false
    export let id = undefined

    let infos

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
            let res
            if (isManager) {
                res = await fetch(url + '/managers/infos', {
                    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
                })
            } else if (isSupervisor) {
                res = await fetch(url + '/managers/' + id, {
                    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
                })
            } else {
                res = await fetch(url + '/managers/' + id)
            }

            if (res.status === 200) {
                let json = await res.json()
                if (json.success) {
                    infos = json.infos
                    if (isManager) {
                        promiseEvents = getEvents()
                    }
                    return json.infos
                }
            }

            throw new Error('Comunicazione con il server fallita')
        } catch (e) {
            throw new Error('Comunicazione con il server fallita')
        }
    }

    async function getEvents() {
        try {
            let res
            if (isManager) {
                res = await fetch(url + '/managers/my-events', {
                    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
                })
            } else {
                res = await fetch(url + `/managers/${id}/events`)
            }
            if (res.status === 200) {
                let json = await res.json()
                let events
                if (isManager) {
                    events = json.events.map((e) => ({
                        ...e,
                        address: infos?.address,
                        participants: e.participantsList.length
                    }))
                } else {
                    events = json.events
                }

                return events
            }
            throw new Error('Comunicazione con il server fallita')
        } catch (e) {
            console.log(e)
            throw new Error('Comunicazione con il server fallita')
        }
    }

    async function approvationManager(approved) {
        try {
            let res = await fetch(url + '/supervisors/manager-approvation/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({ approved, sendEmail: true })
            })

            if (res.status === 200) {
                let json = await res.json()

                if (json.success) {
                    supErr = ''
                    promiseInfos = getInfos()
                    goto('/locale/' + id)
                    return
                } else {
                    supErr = json.message
                    return
                }
            }

            supErr = 'Errore di comunicazione con i server'
        } catch (e) {
            supErr = 'Errore di comunicazione con i server'
        }
    }

    let supErr = ''

    let promiseInfos = getInfos()
    let delay = (time) => {
        return new Promise((res) => {
            setTimeout(() => res([]), time)
        })
    }

    let promiseEvents = delay(5000)

    if (!isManager) {
        promiseEvents = getEvents()
    }
</script>

<div class="container">
    {#await promiseInfos then infos}
        <div class="container-dati">
            <div class="dati">
                <h1>{isManager ? 'I miei dati' : 'Informazioni'}</h1>
                <div>
                    <div>
                        <h2>Nome Locale</h2>
                        <span>{infos.localName}</span>
                    </div>
                    <div>
                        <h2>Posizione</h2>
                        <span
                            >{infos.address.city}, {infos.address.street}
                            {infos.address.number}</span
                        >
                    </div>
                    <div>
                        <h2>Email</h2>
                        <span>{infos.email}</span>
                        {#if isManager}
                            <span class="verified" class:yes={infos.verifiedEmail}>
                                [{!infos.verifiedEmail ? 'not ' : ''}verified]</span
                            >
                        {/if}
                    </div>
                    <div>
                        <h2>Tipo di locale</h2>
                        <span>{infos.localType}</span>
                    </div>
                </div>
                {#if isSupervisor}
                    <div
                        button
                        on:click|preventDefault={async () => {
                            await approvationManager(!infos.approvation?.approved)
                        }}
                        on:keydown={() => {}}
                    >
                        <div>{infos.approvation?.approved ? 'Revoca' : 'Approva'}</div>
                    </div>
                    {#if supErr}
                        <p style="color: red;">{supErr}</p>
                    {/if}
                {/if}
            </div>
            {#if isManager}
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
            {/if}
        </div>
    {:catch error}
        <p>{error.message}</p>
    {/await}
    {#await promiseEvents then events}
        <div class="container-events">
            <div>
                <h1>{isManager ? 'I miei eventi' : 'Gli eventi del locale'}</h1>
                {#if isManager}
                    <a href="/crea-evento" button=""><div>Crea un evento</div></a>
                {/if}
                {#if events.length === 0}
                    <h2>Nessun evento caricato</h2>
                {/if}
            </div>
            <div class="events">
                {#each events as event (event._id)}
                    <Event {event} />
                {/each}
            </div>
        </div>
    {:catch error}
        <p>{error.message}</p>
    {/await}
</div>

<style>
    .container {
        margin-top: 2em;
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

    h2 {
        color: #fcfcfc;
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

    .container-events {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 2em;
        gap: 5em;
    }

    .container-events > div:first-child {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
    }

    .container-events > div:first-child > h1 {
        width: fit-content;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    .container-events > div:first-child > a[button] {
        padding: 3px;
        background-color: #272e3c;
        box-shadow: 0 0 120px var(--generate-button-shadow-wide, transparent),
            0 4px 12px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1),
            inset 0 1px 1px var(--generate-button-shadow-inset, rgba(255, 255, 255, 0.1)),
            0 0 0 var(--generate-button-shadow-outline, 0) rgba(109, 68, 244, 0.4);
        height: auto;
        display: flex;
        white-space: nowrap;
        border-radius: 50px;
        border: none;
        cursor: pointer;
        font-weight: 600;
        font-size: 0.9em;
        align-items: center;
        justify-content: center;
        letter-spacing: 0.005em;
        transform: scale(0.8);
        transition: transform 0.3s, background-color 3s, box-shadow 0.3s;
    }

    .container-events > div:first-child > a[button]:hover {
        transform: scale(1);
        --generate-button-shadow-inset: rgba(255, 255, 255, 0.7);
        background: linear-gradient(-60deg, var(--navtext-color-underline), #ff3c00);
        box-shadow: 0 0 30px #ff3c0079, 0 4px 12px rgba(0, 0, 0, 0.05),
            0 0 0 4px rgba(150, 0, 255, 0.3),
            inset 0 1px 1px var(--generate-button-shadow-inset, rgba(255, 255, 255, 0.1)),
            0 0 0 var(--generate-button-shadow-outline, 0) rgba(109, 68, 244, 0.4);
    }

    .container-events > div:first-child > a[button]:hover div {
        color: var(--navtext-color-selected);
    }

    .container-events > div:first-child > a[button] div {
        color: var(--navtext-color);
        width: 100%;
        height: 100%;
        display: flex;
        padding: 13px 25px;
        border-radius: 50px;
        align-items: center;
        justify-content: center;
        transition: color 0.3s;
    }

    .events {
        width: 100%;
        display: grid;
        justify-content: space-around;
        row-gap: 50px;
        padding-bottom: 4em;
        height: fit-content;
    }

    @media (min-width: 700px) {
        .events {
            grid-template-columns: max-content max-content;
        }
    }

    @media (min-width: 1400px) {
        .events {
            grid-template-columns: max-content max-content max-content;
        }
    }

    @media (min-width: 1800px) {
        .events {
            grid-template-columns: max-content max-content max-content max-content;
        }
    }

    *[button] {
        padding: 3px;
        background-color: #272e3c;
        box-shadow: 0 0 120px var(--generate-button-shadow-wide, transparent),
            0 4px 12px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1),
            inset 0 1px 1px var(--generate-button-shadow-inset, rgba(255, 255, 255, 0.1)),
            0 0 0 var(--generate-button-shadow-outline, 0) rgba(109, 68, 244, 0.4);
        height: auto;
        display: flex;
        white-space: nowrap;
        border-radius: 50px;
        border: none;
        cursor: pointer;
        font-weight: 600;
        align-items: center;
        justify-content: center;
        letter-spacing: 0.005em;
        transform: scale(0.8);
        transition: transform 0.3s, background-color 3s, box-shadow 0.3s;
        line-height: 26px;
    }

    *[button]:hover {
        transform: scale(1);
        --generate-button-shadow-inset: rgba(255, 255, 255, 0.7);
        background: linear-gradient(-60deg, var(--navtext-color-underline), #ff3c00);
        box-shadow: 0 0 30px #ff3c0079, 0 4px 12px rgba(0, 0, 0, 0.05),
            0 0 0 4px rgba(150, 0, 255, 0.3),
            inset 0 1px 1px var(--generate-button-shadow-inset, rgba(255, 255, 255, 0.1)),
            0 0 0 var(--generate-button-shadow-outline, 0) rgba(109, 68, 244, 0.4);
    }

    *[button]:hover div {
        color: var(--navtext-color-selected);
    }

    *[button] div {
        color: var(--navtext-color);
        width: 100%;
        height: 100%;
        display: flex;
        padding: 13px 25px;
        border-radius: 50px;
        align-items: center;
        justify-content: center;
        font-size: large;
        transition: color 0.3s;
    }
</style>
