export const HttpRequest = {
    isDev: false,
    post: async (url, body, handleSuccess = null, handleError) => {
        return await this.fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(data => {
                if (this.isDev) console.log('data: ', data)
                if (null !== handleSuccess) handleSuccess(data);
            })
    },
    fetch: (url, init) => {
        return fetch(url, init)
    }
}