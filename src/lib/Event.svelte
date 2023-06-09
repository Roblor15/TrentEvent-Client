<script>
    import { convertDate } from './general'

    export let event

    $: console.log(event)
</script>

<a href={'/evento/' + event._id}>
    <div class="container">
        <img src="" alt="Foto del locale" />
        <div class="info">
            <div>
                <h1>{event.name}</h1>
            </div>
            <div>
                <h1>Posizione</h1>
                <span>{event.address.city}, {event.address.street} {event.address.number}</span>
            </div>
            <div>
                <h1>Quando</h1>
                <span>{convertDate(event.initDate)}</span>
            </div>
            <div class="caratteristiche">
                <div class="price">
                    <h1>Prezzo</h1>
                    <span>{event.price > 0 ? event.price + ' €' : '-'}</span>
                </div>
                <div>
                    <h1>Iscrizioni</h1>
                    <span
                        >{event.participants}{event.limitPeople > 0
                            ? '/' + event.limitPeople
                            : ''}</span
                    >
                </div>
                <div>
                    <h1>Età minima</h1>
                    <span>{event.ageLimit > 0 ? event.ageLimit : '-'}</span>
                </div>
            </div>
        </div>
    </div></a
>

<style>
    a {
        height: max-content;
        text-decoration: none;
    }

    .container {
        max-width: 330px;
        width: 90vw;
        color: #fcfcfc;
    }

    .info {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 1em;
        background-color: #403588;
        border-radius: 0 0 0.5em 0.5em;
        padding: 0.5em 1em;
    }

    .info h1 {
        font-size: 1.1em;
        margin: 0;
        font-weight: 900;
        color: #ffcd49;
    }

    .info > div:first-child {
        width: 100%;
        display: flex;
        margin-bottom: 0.5em;
        align-items: baseline;
    }

    .info > div:first-child h1 {
        color: #ff781e;
        width: fit-content;
        font-size: 1.2em;
    }

    .price {
        font-weight: 800;
    }

    .caratteristiche {
        display: flex;
        flex-direction: row;
        margin-bottom: 1.2em;
        font-size: 0.9em;
        justify-content: space-between;
    }

    .caratteristiche div {
        display: flex;
        flex-direction: column;
    }

    .caratteristiche span {
        margin-left: auto;
        margin-right: 3px;
    }
</style>
