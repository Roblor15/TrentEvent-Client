<script>
    import { url } from './variables'

    async function getManagers(t) {
        try {
            let res = await fetch(url + '/supervisors/manager', {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
            })

            if (res.status === 200) {
                let json = await res.json()

                if (json.success) {
                    return json.managers.filter((m) => {
                        if (t === 'daApprovare') {
                            return m.approvation === undefined
                        }
                        if (t === 'approvati') {
                            return m.approvation?.approved === true
                        }
                        if (t === 'nonApprovati') {
                            return m.approvation?.approved === false
                        }
                    })
                } else {
                    throw new Error(json.message)
                }
            }

            throw new Error('Comunicazione con i server fallita')
        } catch (e) {
            throw new Error('Comunicazione con i server fallita')
        }
    }

    async function getReports() {
        try {
            let res = await fetch(url + '/reports', {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
            })

            if (res.status === 200) {
                let json = await res.json()

                if (json.success) {
                    return json.reports
                } else {
                    throw new Error(json.message)
                }
            }

            throw new Error('Comunicazione con i server fallita')
        } catch (e) {
            throw new Error('Comunicazione con i server fallita')
        }
    }

    let type = 'daApprovare'

    let promiseManagers = getManagers(type)
    let promiseReports = getReports()
</script>

<div class="container">
    <div>
        <div class="selection">
            <button
                class={type === 'daApprovare' ? 'active' : ''}
                on:click={() => {
                    type = 'daApprovare'
                    promiseManagers = getManagers(type)
                }}>Da approvare</button
            >
            <button
                class={type === 'approvati' ? 'active' : ''}
                on:click={() => {
                    type = 'approvati'
                    promiseManagers = getManagers(type)
                }}>Approvati</button
            >
            <button
                class={type === 'nonApprovati' ? 'active' : ''}
                on:click={() => {
                    type = 'nonApprovati'
                    promiseManagers = getManagers(type)
                }}>Non approvati</button
            >
        </div>

        {#await promiseManagers then managers}
            {#each managers as manager}
                <div>{manager.localName}</div>
            {/each}
        {/await}
    </div>
    <div>
        {#await promiseReports then reports}
            {#each reports as report}
                <div />
            {/each}
        {/await}
    </div>
</div>

<style>
    .container {
        display: grid;
        grid-template-columns: 50% 50%;
    }

    .container > div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .selection {
        display: flex;
        gap: 1em;
    }

    .selection button {
        color: #fff;
        background: rgba(255, 255, 255, 0.3);
        backdrop-filter: blur(10px);
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.3);
        box-shadow: 10px 10px 60px -8px rgba(0, 0, 0, 0.2);
        padding: 1em;
        transition: background-color 0.3s ease-in-out;
    }

    .selection button:hover:not(.active) {
        background: rgba(255, 255, 255, 0.1);
        box-shadow: 4px 4px 60px 8px rgba(0, 0, 0, 0.2);
        cursor: pointer;
    }

    .selection .active {
        background: #ffc83cc4;
    }
</style>
