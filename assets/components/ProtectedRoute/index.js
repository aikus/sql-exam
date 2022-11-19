import React from 'react';
import {GetPermission} from '../../Service/Auth'
import {Outlet} from "react-router-dom";
import {AccessDenied} from "../AccessDenied";

export const ProtectedRoute = ({ allowedRoles }) => {

  return (
    GetPermission(allowedRoles)
      ? <Outlet />
      : <AccessDenied/>
  );
}