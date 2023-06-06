<script>
    import { onMount } from 'svelte'
    import { url } from './variables'

    let infos
    let error
    onMount(async () => {
        try {
            infos = await getInfos()
        } catch (e) {
            error = e.message
        }
    })
    async function getInfos() {
        try {
            let res = await fetch(url + '/users/manager', {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
            })

            if (res.status === 200) {
                let json = await res.json()
                if (json.success) {
                    return json.infos
                }
            }

            throw new Error('Comunicazione con il server fallita')
        } catch (e) {
            throw new Error('Comunicazione con il server fallita')
        }
    }
</script>

<div class="container">
    <div>
        {#if error}
            <p>error</p>
        {:else if infos}
            <h1>I miei dati</h1>
            <div>
                <div>
                    <h2>Nome Locale</h2>
                    <span>{infos.localName}</span>
                </div>
                <div>
                    <h2>Posizione</h2>
                    <span>{infos.address.city}, {infos.address.street} {infos.address.number}</span>
                </div>
                <div>
                    <h2>Email</h2>
                    <span>{infos.email} [{!infos.verifiedEmail ? 'not ' : ''}verified]</span>
                </div>
                <div>
                    <h2>Tipo di locale</h2>
                    <span>{infos.localType}</span>
                </div>
            </div>
        {/if}
    </div>
    <div>
        <div>
            <h1>I miei eventi</h1>
            <a href="/crea-evento"><button>Crea un evento</button></a>
        </div>
        <div />
    </div>
</div>
