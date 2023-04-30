import {HttpRequest} from "../Service/HttpRequest";

export const TokenRepository = {
  get: (email, password, handleSuccess, handleError) => {
    const body = {
      email: email,
      password: password
    }

    HttpRequest.customAction = true;
    HttpRequest.post(`/api/login`, body, (data) => handleSuccess(data), (error) => handleError(error))
  },

  create: (user, handleSuccess, handleError) => {
    const body = {
      email: user?.email,
      agreeTerms: user?.agreeTerms,
      fio: user?.fio,
      plainPassword: user?.plainPassword
    }

    HttpRequest.skipToken = true;
    HttpRequest.post(`/api/register`, body, (data) => handleSuccess(data), (error) => handleError(error))
  },

  change: (email, handleSuccess, handleError) => {
    const body = {
      email: email,
    }

    HttpRequest.skipToken = true;
    HttpRequest.post(`/confirm/password`, body, (data) => handleSuccess(data), (error) => handleError(error))
  },

  delete: (handleResponse) => {
    HttpRequest.get(`/api/logout`,(data) => handleResponse(data), (error) => handleResponse(error))
  }
}