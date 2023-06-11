<script>
    import { getContext } from 'svelte'

    import ManagerHome from '../../../lib/ManagerHome.svelte'

    export let data

    let userType = getContext('userType')
</script>

<div class="container">
    <ManagerHome id={data.id} isSupervisor={$userType === 'Supervisor'} />
</div>
