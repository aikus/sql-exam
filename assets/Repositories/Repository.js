import {hostName} from "../config";

export const AuthorizationRep = {
  login: (email, password, handleSuccess) => {
    fetch(`${hostName}/api/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(response => response.json())
      .then(data => {
        if (handleSuccess) {
          handleSuccess(data);
        }
      })
  }
}