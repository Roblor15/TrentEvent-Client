<script>
    // TODO: iscrizione e discrizione

    import { getContext } from 'svelte'
    import { goto } from '$app/navigation'

    import Form from '../../../lib/Form.svelte'
    import { url } from '../../../lib/variables'
    import { convertDate } from '../../../lib/general'

    const userType = getContext('userType')

    export let data

    let modifyEvent
    let address

    const getEvent = async () => {
        try {
            let res
            if ($userType === 'Manager' || $userType === 'Participant') {
                res = await fetch(url + '/events/' + data.id, {
                    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
                })
            } else {
                res = await fetch(url + '/events/' + data.id)
            }
            if (res.status === 200) {
                let json = await res.json()

                if (json.success) {
                    let event = json.event
                    address = event?.address ? event.address : event?.manager.address
                    modifyEvent = {
                        ...event,
                        initDate: event.initDate.slice(0, 16),
                        endDate: event.endDate.slice(0, 16)
                    }

                    return event
                }

                throw new Error(json.message)
            }

            throw new Error('Errore con i server')
        } catch (e) {
            throw new Error('Errore con i server')
        }
    }

    let error
    let errorSub

    let message

    let categories = [
        { type: 'musica', text: 'Musica' },
        { type: 'discoteca', text: 'Discoteca' },
        { type: "all'aperto", text: "All'aperto" },
        { type: 'al chiuso', text: 'Al chiuso' },
        { type: 'concerto', text: 'Concerto' }
    ]

    let report

    async function sendRequest() {
        try {
            let res = await fetch(url + `/events/${data.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify(modifyEvent)
            })
            if (res.status === 200) {
                let json = await res.json()

                if (!json.success) {
                    error = json.message
                } else {
                    error = ''
                    promise = getEvent()
                    goto('/evento/' + data.id)
                }
            } else if (res.headers.get('content-type').includes('application/json')) {
                let json = await res.json()

                error = json.message
            } else {
                error = 'Internal Error'
            }
        } catch (e) {
            error = 'Internal Error'
        }
    }

    async function sendReport() {
        try {
            let res = await fetch(url + '/reports', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({ reportText: report, eventId: data.id })
            })
            if (res.status === 200) {
                let json = await res.json()

                if (!json.success) {
                    error = json.message
                } else {
                    error = ''
                    report = ''
                    message = 'Segnalazione inviata'
                    promise = getEvent()
                    goto('/evento/' + data.id)
                }
            } else if (res.headers.get('content-type').includes('application/json')) {
                let json = await res.json()

                error = json.message
            } else {
                error = 'Internal Error'
            }
        } catch (e) {
            error = 'Internal Error'
        }
    }

    async function toggleSubscribe() {
        try {
            let subscribed = modifyEvent.subscribed ? 'unsubscribe' : 'subscribe'
            let res = await fetch(url + `/events/${data.id}/${subscribed}`, {
                method: 'PUT',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            if (res.status === 200) {
                let json = await res.json()

                if (!json.success) {
                    errorSub = json.message
                } else {
                    errorSub = ''
                    promise = getEvent()
                    goto('/evento/' + data.id)
                }
            } else if (res.headers.get('content-type').includes('application/json')) {
                let json = await res.json()

                errorSub = json.message
            } else {
                errorSub = 'Internal Error'
            }
        } catch (e) {
            errorSub = 'Internal Error'
        }
    }

    async function deleteEvent() {
        try {
            let res = await fetch(url + `/events/${data.id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            if (res.status === 200) {
                let json = await res.json()

                if (!json.success) {
                    errorSub = json.message
                } else {
                    goto('/')
                }
            } else if (res.headers.get('content-type').includes('application/json')) {
                let json = await res.json()

                errorSub = json.message
            } else {
                errorSub = 'Internal Error'
            }
        } catch (e) {
            errorSub = 'Internal Error'
        }
    }

    let promise = getEvent()
</script>

<div class="root" class:manager={$userType === 'Manager'}>
    {#await promise then event}
        <div class="container">
            <div class="title">
                <h1>{event.name}</h1>
                {#if $userType !== 'Manager'}
                    <a href={'/locale/' + event.manager} button><div>Locale</div></a>
                {/if}
                <p>{event.description}</p>
            </div>
            <div class="infos">
                <div>
                    <h2>Categorie</h2>
                    <span
                        >{event.categories
                            ?.map((s) => s[0].toUpperCase() + s.slice(1))
                            .join(', ')}</span
                    >
                </div>
                <div>
                    <h2>Luogo</h2>
                    <span
                        >{address?.country}
                        {address?.city}
                        {address?.street}
                        {address?.number}</span
                    >
                </div>
                <div>
                    <h2>Data</h2>
                    <span>{convertDate(event.initDate, event.endDate)}</span>
                </div>
                <div>
                    <h2>Iscrizioni</h2>
                    <span
                        >{event.participants}{event.limitPeople > 0
                            ? '/' + event.limitPeople
                            : ''}</span
                    >
                </div>
                <div>
                    <h2>Età minima</h2>
                    <span>{event.ageLimit > 0 ? event.ageLimit : '-'}</span>
                </div>
                <div>
                    <h2>Prezzo</h2>
                    <span>{event.price > 0 ? event.price + ' €' : '-'}</span>
                </div>
            </div>
            {#if $userType === 'Participant'}
                <div
                    button
                    colored={event.subscribed ? undefined : true}
                    on:click|preventDefault={toggleSubscribe}
                    on:keydown={() => {}}
                >
                    <div>{event.subscribed ? 'Disiscriviti' : 'Iscriviti'}</div>
                </div>
            {:else if $userType === 'Manager'}
                <div button on:click|preventDefault={deleteEvent} on:keydown={() => {}}>
                    <div>Elimina</div>
                </div>
            {/if}
            {#if errorSub}
                <p style="color: red;">{errorSub}</p>
            {/if}
        </div>
        {#if $userType === 'Manager'}
            <div class="container">
                <Form on:submit={sendRequest}>
                    <p>Modifica evento</p>
                    {#if error}
                        <p name="error">{error}</p>
                    {/if}
                    <label for="name">Nome Evento</label>
                    <input
                        type="text"
                        required
                        placeholder="Nome evento"
                        bind:value={modifyEvent.name}
                    />
                    <label for="description">Descrizione Evento</label>
                    <textarea
                        rows="8"
                        required
                        placeholder="Breve Descrizione"
                        bind:value={modifyEvent.description}
                    />
                    <label for="ageLimit">Limite di età</label>
                    <input
                        type="number"
                        placeholder="Limite di età"
                        bind:value={modifyEvent.ageLimit}
                    />
                    <label for="limitPeople">Limite di persone</label>
                    <input
                        type="number"
                        placeholder="Limite di persone"
                        bind:value={modifyEvent.limitPeople}
                    />
                    <label for="price">Prezzo in Euro</label>
                    <input
                        type="number"
                        placeholder="Prezzo in euro"
                        bind:value={modifyEvent.price}
                    />
                    <label for="initDate">Data di inizio</label>
                    <input
                        name="initDate"
                        type="datetime-local"
                        required
                        bind:value={modifyEvent.initDate}
                    />
                    <label for="endDate">Data di fine</label>
                    <input
                        name="endDate"
                        type="datetime-local"
                        required
                        bind:value={modifyEvent.endDate}
                    />

                    <label for="categories">Categorie dell'evento</label>
                    <select name="categories" multiple bind:value={modifyEvent.categories}>
                        {#each categories as category}
                            <option value={category.type}>{category.text}</option>
                        {/each}
                    </select>

                    <button type="submit">Modifica</button>
                </Form>
            </div>
        {:else if $userType === 'Participant'}
            <div class="container">
                <Form on:submit={sendReport}>
                    <p>Segnala Evento</p>
                    {#if message}
                        <p name="message">{message}</p>
                    {/if}
                    {#if error}
                        <p name="error">{error}</p>
                    {/if}
                    <label for="segnalazione">Testo</label>
                    <textarea rows="15" bind:value={report} placeholder="Segnalazione" />
                </Form>
            </div>
        {/if}
    {:catch error}
        <p style="color: red;">{error.message}</p>
    {/await}
</div>

<style>
    a {
        text-decoration: none;
    }

    .root {
        display: flex;
        justify-content: space-around;
        margin-bottom: 5em;
    }

    .root.manager {
        margin-top: 70px;
    }

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #fcfcfc;
    }

    .title {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .infos {
        width: 300px;
        margin-bottom: 2em;
    }

    p {
        width: 90vw;
        max-width: 300px;
    }

    h1 {
        color: #ffcd49;
        width: fit-content;
    }

    h2 {
        color: #ff781e;
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

    *[button][colored] {
        --generate-button-shadow-inset: rgba(255, 255, 255, 0.7);
        background: linear-gradient(-60deg, var(--navtext-color-underline), #ff3c00);
        box-shadow: 0 0 30px #ff3c0079, 0 4px 12px rgba(0, 0, 0, 0.05),
            0 0 0 4px rgba(150, 0, 255, 0.3),
            inset 0 1px 1px var(--generate-button-shadow-inset, rgba(255, 255, 255, 0.1)),
            0 0 0 var(--generate-button-shadow-outline, 0) rgba(109, 68, 244, 0.4);
    }

    *[button][colored] div {
        color: var(--navtext-color-selected);
    }
</style>
