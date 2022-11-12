import React from 'react';
import {DeniedPage} from "../components/DeniedPage";

export let Auth = {
  _role: null,

  get role() {
    return this._role;
  },

  set role(value) {
    this._role = value;
  }
}

export const GetPermission = (allowedRoles) => {
  if (Auth.role) {
    for (let i = 0; i < Auth.role.length; i++) {
      if (allowedRoles.includes(Auth.role[i])) return true;
    }
  }

  return false;
}

export const ProtectedRoutes = (component, allowedRoles) => {
  if (GetPermission(allowedRoles)) return component;

  return <DeniedPage/>
}