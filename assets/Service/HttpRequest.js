export const HttpRequest = {
    isDev: true,
    post: (url, body, handleSuccess = null, handleError) => request(url, body, handleSuccess, handleError, 'POST'),
    put: (url, body, handleSuccess = null, handleError) => request(url, body, handleSuccess, handleError, 'PUT')
}

const request = async (url, body, handleSuccess = null, handleError, method) => {
  return await fetch(url, {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
    },
    body: JSON.stringify(body)
  })
    .then(response => {
      if (response.status >= 400) {
        return Promise.reject(new Error(response.statusText))
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
      console.log('error', error)
      if (handleError) {
        handleError(error)
      }
    })
}