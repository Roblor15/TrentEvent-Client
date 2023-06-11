<script>
    import { getContext } from 'svelte'

    import ManagerHome from '../../../lib/ManagerHome.svelte'

    export let data

    let userType = getContext('userType')
</script>

<div class="container">
    {#if $userType === 'Supervisor'}
        <ManagerHome id={data.id} isSupervisor />
    {:else}
        <ManagerHome id={data.id} />
    {/if}
</div>
