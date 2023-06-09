<script>
    import ManagerHome from '../../../lib/ManagerHome.svelte'

    export let data
</script>

<div class="container">
    <ManagerHome id={data.id} />
</div>
