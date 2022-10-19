export const HttpRequest = {
    isDev: true,
    post: (url, body, handleSuccess = null, handleError = null) => request(url, body, handleSuccess, handleError, 'POST'),
    put: (url, body, handleSuccess = null, handleError = null) => request(url, body, handleSuccess, handleError, 'PUT'),
    get: (url, handleSuccess = null, handleError = null) => request(url, null, handleSuccess, handleError, 'GET'),
    delete: (url, handleSuccess = null, handleError = null) => {
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
            },
        })
          .then(response => {
              if (response.status >= 400) {
                  return Promise.reject(new Error(response.statusText))
              }
              return Promise.resolve(response)
          })
          .then(data => {
              if (HttpRequest.isDev) console.log('data: ', data)
              if (handleSuccess) {
                  handleSuccess(data)
              }
          })
          .catch(error => {
              if (HttpRequest.isDev) console.log('error', error)
              if (handleError) {
                  handleError(error)
              }
          })
    },
}

const request = async (url, body, handleSuccess = null, handleError, method) => {

    let init = {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
        },
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
        .then(response => response.json())
        .then(data => {
            if (HttpRequest.isDev) console.log('data: ', data)
            if (handleSuccess) {
                handleSuccess(data)
            }
        })
        .catch(error => {
            if (HttpRequest.isDev) console.log('error', error)
            if (handleError) {
                error.json().then(json => {
                    handleError({
                        status: error.status,
                        statusText: error.statusText,
                        body: json
                    })
                })
            }
        })
}