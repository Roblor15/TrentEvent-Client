<script>
    import { onMount } from 'svelte'
    import Event from '../lib/Event.svelte'
    import { url } from '../lib/variables'

    let events = []

    onMount(async () => {
        events = await fetch(url + '/events')
    })
</script>

<div>
    <div class="events">
        {#each events as event (event._id)}
            <Event {event} />
        {/each}
    </div>
</div>
