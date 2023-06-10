<script>
    import { getContext } from 'svelte'
    import Event from '../../lib/Event.svelte'
    import { url } from '../../lib/variables'

    let userType = getContext('userType')

    async function getSubscription() {
        try {
            let res = await fetch(url + '/events/subscribed', {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
            })

            if (res.status === 200) {
                let json = await res.json()

                if (json.success) {
                    return json.events
                }

                throw new Error(json.message)
            }

            throw new Error('Errore con i server')
        } catch (e) {
            throw new Error('Errore con i server')
        }
    }

    let delay = (time) => {
        return new Promise((res) => {
            setTimeout(() => res([]), time)
        })
    }

    let promise = delay(5000)
    if ($userType === 'Participant') promise = getSubscription()
</script>

<div class="container">
    {#if $userType === 'Participant'}
        {#await promise then events}
            <div class="events">
                {#each events as event}
                    <Event {event} />
                {/each}
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
        display: flex;
        flex-direction: column;
        align-items: center;
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
</style>
