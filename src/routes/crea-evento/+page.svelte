<script>
    import Form from '../../lib/Form.svelte'
    import { url } from '../../lib/variables'
    import { getContext } from 'svelte'

    let userType = getContext('userType')

    let event = {
        initDate: undefined,
        endDate: undefined,
        name: undefined,
        ageLimit: undefined,
        limitPeople: undefined,
        price: undefined,
        description: undefined,
        categories: []
    }

    let categories = [
        { type: 'musica', text: 'Musica' },
        { type: 'discoteca', text: 'Discoteca' },
        { type: "all'aperto", text: "All'aperto" },
        { type: 'al chiuso', text: 'Al chiuso' },
        { type: 'concerto', text: 'Concerto' }
    ]

    let error = ''

    const sendRequest = async () => {
        try {
            let res = await fetch(url + '/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify(event)
            })

            if (res.status === 200) {
                let json = await res.json()

                if (!json.success) {
                    error = json.message
                } else {
                    error = ''
                }
            } else if (res.headers.get('content-type').includes('application/json')) {
                let json = await res.json()
                error = json.message
            } else {
                error = 'Internal Error'
            }
        } catch (e) {
            error = e.toString()
        }
    }
</script>

<svelte:head>
    <title>TrentEvent - Crea Evento</title>
</svelte:head>
<div class="container">
    {#if $userType === 'Manager'}
        <Form on:submit={sendRequest}>
            <p>Crea un evento</p>
            {#if error}
                <p name="error">{error}</p>
            {/if}
            <input type="text" required placeholder="Nome evento" bind:value={event.name} />
            <textarea
                rows="8"
                required
                placeholder="Breve Descrizione"
                bind:value={event.description}
            />
            <input type="number" placeholder="Limite di età" bind:value={event.ageLimit} />
            <input type="number" placeholder="Limite di persone" bind:value={event.limitPeople} />
            <input type="number" placeholder="Prezzo in euro" bind:value={event.price} />
            <label for="initDate">Data di inizio</label>
            <input name="initDate" type="datetime-local" required bind:value={event.initDate} />
            <label for="endDate">Data di fine</label>
            <input name="endDate" type="datetime-local" required bind:value={event.endDate} />

            <label for="categories">Categorie dell'evento</label>
            <select name="categories" multiple bind:value={event.categories}>
                {#each categories as category}
                    <option value={category.type}>{category.text}</option>
                {/each}
            </select>

            <button type="submit">Crea Evento</button>
        </Form>
    {:else}
        <p class="message">Non sei autorizzato a creare eventi</p>
    {/if}
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: 100px;
        align-items: center;
        justify-content: center;
        padding: 3em 0;
        min-height: calc(100vh - 6em - 5em);
        height: fit-content;
        font-family: 'Montserrat', sans-serif;
    }

    .message {
        color: #fcfcfc;
    }
</style>
