<script>
    import Menu from '../lib/Menu.svelte'
    import { onMount, setContext } from 'svelte'
    import { writable } from 'svelte/store'

    import { url } from '../lib/variables'
    import { decode } from '../lib/general'

    let userType = writable('')

    setContext('userType', userType)
    onMount(async () => {
        let token = localStorage.getItem('token')

        if (token) {
            let res = await fetch(url + '/users/valid-token', {
                headers: { Authorization: 'Bearer ' + token }
            })

            if (res.status === 200) {
                let body = await res.json()
                if (body.success) {
                    userType.set(decode(token).type)
                }
            }
        }
    })
</script>

<Menu />
<slot />

<style>
    :global(body) {
        background-color: #1a202d;
    }
</style>
