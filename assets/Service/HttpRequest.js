export const HttpRequest = {
    isDev: false,
    post: async (url, body) => {
        return await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
            },
            body: JSON.stringify(body)
        })
            .then(r => r.json())
    },
    get: async (url) => {
        return await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
            },
        })
            .then(r => r.json())
    },
}