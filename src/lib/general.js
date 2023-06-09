export function decode(token) {
    let base64Url = token.split('.')[1]
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    let jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split('')
            .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            })
            .join('')
    )

    return JSON.parse(jsonPayload)
}

export function convertDate(data, data2 = undefined) {
    let d = new Date(data)
    let res
    if (data2) {
        let d2 = new Date(data2)
        if (d.getDate() === d2.getDate()) {
            res =
                d.toLocaleString('it-IT', { timeStyle: 'short', dateStyle: 'medium' }) +
                ' - ' +
                d2.toLocaleString('it-IT', { timeStyle: 'short' })
        } else {
            res =
                d.toLocaleString('it-IT', { timeStyle: 'short', dateStyle: 'medium' }) +
                ' - ' +
                d2.toLocaleString('it-IT', { timeStyle: 'short', dateStyle: 'medium' })
        }
    } else {
        res = d.toLocaleString('it-IT', { timeStyle: 'short', dateStyle: 'medium' })
    }

    return res
}
