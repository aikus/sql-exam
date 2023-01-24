import React from 'react';
import useAuth from "../hooks/useAuth";

export const GetPermission = (allowedRoles) => {
  const {auth} = useAuth();

  return auth.roles?.find(role => allowedRoles?.includes(role))
}