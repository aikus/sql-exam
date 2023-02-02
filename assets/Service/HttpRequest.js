export const HttpRequest = {
    isDev: true,
    post: (url, body, handleSuccess = null, handleError = null, customAction, skipToken) => request(url, body, handleSuccess, handleError, 'POST', customAction, skipToken),
    put: (url, body, handleSuccess = null, handleError = null) => request(url, body, handleSuccess, handleError, 'PUT'),
    get: (url, handleSuccess = null, handleError = null) => request(url, null, handleSuccess, handleError, 'GET'),
    delete: (url, handleSuccess = null, handleError = null) => request(url, null, handleSuccess, handleError, 'DELETE'),
}

const request = async (url, body, handleSuccess = null, handleError, method, customAction, skipToken) => {

    let init = {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
        },
    }

    if (!skipToken) {
        init.headers.Authorization = 'Bearer ' + localStorage.getItem('jwtToken')
    }

    if (null !== body) {
        init['body'] = JSON.stringify(body)
    }

    return await fetch(url, init)
        .then(response => {
            if (response.status >= 400) {
                return Promise.reject(response)
            }
            return Promise.resolve(response)
        })
        .then(response => {
            if (init.method !== 'DELETE' && !response.redirected) {
                return response.json()
            }

            return response
        })
        .then(data => {
            if (HttpRequest.isDev) console.log(`HttpRequest (${init.method}): `, data)
            if (handleSuccess) {
                handleSuccess(data)
            }
        })
        .catch(error => {
            if (HttpRequest.isDev) console.error(`HttpRequest (${init.method}): `, error)
            if (!customAction && error.status === 401) {
                window.location.href = location.origin + '/react';
                localStorage.removeItem('jwtToken')
            }
            if (handleError) {
                if (init.method !== 'DELETE') {
                    if (error.status === 500) {
                        handleError({
                            status: error.status,
                            statusText: error.statusText,
                            body: error.body
                        })
                        return error
                    }

                    error.json().then(json => {
                        handleError({
                            status: error.status,
                            statusText: error.statusText,
                            body: json
                        })
                    })
                }

                return error
            }
        })
}