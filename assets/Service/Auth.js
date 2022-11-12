import React from 'react';

export const Auth = {
  _role: null,

  get role() {
    return this._role;
  },

  set role(value) {
    this._role = value;
  }
}

export const GetPermission = (allowedRoles) => {
  return Auth.role?.find(role => allowedRoles?.includes(role))
}