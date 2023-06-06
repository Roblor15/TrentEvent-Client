import { error } from '@sveltejs/kit'

import { url } from '../../../lib/variables'

export async function load({ params }) {
    try {
        let res = await fetch(url + '/users/verify-email/' + params.id)

        if (res.status === 200) {
            let json = await res.json()

            if (json.success) {
                return {
                    message: 'La tua email è stata confermata!'
                }
            }
        }

        throw error(404, 'Not found')
    } catch (e) {
        throw error(404, 'Not found')
    }
}
