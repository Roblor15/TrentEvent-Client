<script>
    import Form from '../../lib/Form.svelte'
    import { url } from '../../lib/variables'

    let event = {
        initDate: undefined,
        endDate: undefined,
        name: undefined,
        ageLimit: undefined,
        limitPeople: undefined,
        price: undefined,
        description: undefined,
        categories: undefined
    }
    console.log(url)

    let error = ''

    const sendRequest = async () => {
        try {
            let res = await fetch(url + '/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(event)
            })

            console.log(res.headers)
            if (res.status === 200) {
                let json = await res.json()

                console.log(json)

                if (!json.success) {
                    error = json.message
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

<div class="container">
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
        <input naem="endDate" type="datetime-local" required bind:value={event.endDate} />
        <button type="submit">Crea Evento</button>
    </Form>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: 100px;
        align-items: center;
        justify-content: center;
        padding: 3em 0;
        background: linear-gradient(45deg, rgb(22, 17, 17), rgb(90, 90, 90));
        min-height: calc(100vh - 6em);
        height: fit-content;
        font-family: 'Montserrat', sans-serif;
    }
</style>
