export const HttpRequest = {
    isDev: true,
    skipToken: false,
    isStringifyBody: true,
    customAction: false,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
    },
    post: async (url, body, handleSuccess = null, handleError = null, config = null) => request(url, body, handleSuccess, handleError, 'POST', config),
    put: async (url, body, handleSuccess = null, handleError = null) => request(url, body, handleSuccess, handleError, 'PUT', HttpRequest),
    get: async (url, handleSuccess = null, handleError = null) => request(url, null, handleSuccess, handleError, 'GET', HttpRequest),
    delete: async (url, handleSuccess = null, handleError = null) => request(url, null, handleSuccess, handleError, 'DELETE', HttpRequest),
    upload: async (url, body, handleSuccess = null, handleError = null) => {
        return request(url, body, handleSuccess, handleError, 'POST', {
            headers: {},
            isStringifyBody: false
        });
    },
}

const getConfig = (config, defaultConfig, name) => {
    if (null !== config && config.hasOwnProperty(name)) {
        return config[name];
    }

    return defaultConfig[name]
}

const request = async (url, body, handleSuccess = null, handleError = null, method, config) => {

    let init = {
        method: method,
        headers: getConfig(config, HttpRequest, 'headers'),
    }

    if (!getConfig(config, HttpRequest, 'skipToken')) {
        init.headers.Authorization = 'Bearer ' + localStorage.getItem('jwtToken')
    }

    if (null !== body) {
        init['body'] = getConfig(config, HttpRequest, 'isStringifyBody') ? JSON.stringify(body) : body
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
                return handleSuccess(data)
            }
        })
        .catch(error => {
            if (HttpRequest.isDev) console.error(`HttpRequest (${init.method}): `, error)
            if (!config.customAction && error.status === 401) {
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