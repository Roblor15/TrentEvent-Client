<script>
    export let event

    console.log(event)
</script>

<div class="container">
    <img src="" alt="Foto del locale" />
    <div class="info">
        <div>
            <h1>Festa</h1>
            <span>{event.name}</span>
        </div>
        <div>
            <h1>Iscritti</h1>
            <span>Da implementare</span>
        </div>
        <div>
            <h1>Età minima</h1>
            <span>{event.limitAge}</span>
        </div>
        <div>
            <h1>Posizione</h1>
            <span>{event.address.country}</span>
        </div>
        <div>
            <h1>Posti disponibili</h1>
            <span>{event.address.country}</span>
        </div>
        <div>
            <h1>Quando</h1>
            <span>{event.address.country}</span>
        </div>
    </div>
</div>

<style>
    .a {
        height: max-content;
    }

    .container {
        max-width: 330px;
        width: 90vw;
    }

    .container > div:first-child {
        transform: scale(0.9);
        transition: transform 0.4s;
    }

    .container > div:first-child:hover {
        transform: scale(1);
    }

    @media (max-width: 750px) {
        .container > div:first-child {
            transform: scale(1);
        }
    }

    .info {
        margin-top: 1em;
        background-color: rgba(221, 221, 221, 0.658);
        border-radius: 0 0 0.5em 0.5em;
        padding: 0.5em 1em;
    }

    .info h1 {
        color: var(--navtext-color-selected);
        font-size: 1.2em;
        display: flex;
        margin: 0;
        width: fit-content;
        font-weight: 900;
    }

    .info > div:first-child {
        width: 100%;
        display: flex;
        margin-bottom: 0.5em;
        align-items: baseline;
    }

    .price {
        margin-left: auto;
        font-weight: 800;
        margin-right: 0.5em;
        min-width: fit-content;
    }

    .info > span {
        display: inline-block;
    }

    .versione {
        font-weight: 700;
    }

    .caratteristiche {
        display: flex;
        flex-direction: column;
        gap: 0.1em;
        margin-bottom: 1.2em;
        font-size: 0.9em;
    }

    .infoVeicolo {
        display: flex;
        justify-content: space-around;
    }

    .infoVeicolo > div {
        display: flex;
        align-items: center;
        gap: 0.4em;
    }
</style>
