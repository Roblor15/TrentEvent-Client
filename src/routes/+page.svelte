<script>
    import { getContext, onMount } from 'svelte'

    import Event from '../lib/Event.svelte'
    import ManagerHome from '../lib/ManagerHome.svelte'
    import { url } from '../lib/variables'

    let userType = getContext('userType')

    let events = []

    onMount(async () => {
        let res = await fetch(url + '/events')
    })
</script>

<svelte:head>
    <title>TrentEvent</title>
</svelte:head>

<div>
    {#if userType === 'Manager'}
        <ManagerHome />
    {:else}
        <div class="events">
            {#each events as event (event._id)}
                <Event {event} />
            {/each}
        </div>
    {/if}
</div>
