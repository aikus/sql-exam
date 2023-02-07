import {hostName} from "../config";
import {HttpRequest} from "../Service/HttpRequest";

export const TokenRepository = {
  get: (email, password, handleSuccess, handleError) => {
    console.log(email)
    console.log(password)
    const body = {
      email: email,
      password: password
    }

    HttpRequest.post(`${hostName}/api/login`, body, (data) => handleSuccess(data), (error) => handleError(error), true)
  },

  create: (email, fio, plainPassword, handleSuccess, handleError) => {
    const body = {
      email: email,
      agreeTerms: 1,
      fio: fio,
      plainPassword: plainPassword
    }

    HttpRequest.post(`${hostName}/api/register`, body, (data) => handleSuccess(data), (error) => handleError(error), false, true)
  },

  change: (email, handleSuccess, handleError) => {
    const body = {
      email: email,
    }

    HttpRequest.post(`${hostName}/confirm/password`, body, (data) => handleSuccess(data), (error) => handleError(error), false, true)
  },

  delete: (handleResponse) => {
    HttpRequest.get(`${hostName}/api/logout`,(data) => handleResponse(data), (error) => handleResponse())
  }
}