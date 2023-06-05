<script>
    import { onMount } from 'svelte'

    import Event from '../lib/Event.svelte'
    import { decode } from '../lib/general'
    import ManagerHome from '../lib/ManagerHome.svelte'
    import { url } from '../lib/variables'

    let typeUser

    let events = []

    onMount(async () => {
        let token = sessionStorage.getItem('token')
        if (token) typeUser = decode(token).type

        let res = await fetch(url + '/events')
    })
</script>

<svelte:head>
    <title>TrentEvent</title>
</svelte:head>
<div>
    {#if typeUser === 'Manager'}
        <ManagerHome />
    {:else}
        <div class="events">
            {#each events as event (event._id)}
                <Event {event} />
            {/each}
        </div>
    {/if}
</div>
