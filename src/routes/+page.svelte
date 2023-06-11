<script>
    import { getContext, onMount } from 'svelte'

    import Event from '../lib/Event.svelte'
    import Form from '../lib/Form.svelte'
    import ManagerHome from '../lib/ManagerHome.svelte'
    import SupervisorHome from '../lib/SupervisorHome.svelte'
    import { url } from '../lib/variables'

    let userType = getContext('userType')

    let events = []

    onMount(async () => {
        if ($userType !== 'Manager') {
            let res = await fetch(url + '/events')

            if (res.status === 200) {
                let json = await res.json()
                events = json.events
            }
        }
    })
</script>

<svelte:head>
    <title>TrentEvent</title>
</svelte:head>

<div class="container">
    {#if $userType === 'Manager'}
        <ManagerHome isManager />
    {:else if $userType === 'Supervisor'}
        <SupervisorHome />
    {:else}
        <div class="events">
            {#each events as event (event._id)}
                <Event {event} />
            {/each}
        </div>
    {/if}
</div>

<style>
    .container {
        padding: 3em 0;
        min-height: calc(100vh - 6em - 5em);
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
