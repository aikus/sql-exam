import React from 'react';
import {Outlet} from "react-router-dom";
import {AccessDenied} from "../AccessDenied";
import useAuth from "../../hooks/useAuth";
import {Loader} from "../Loader";

export const ProtectedRoute = ({ allowedRoles }) => {
  const {auth} = useAuth();

  return (
    Object.keys(auth).length === 0
      ? <Loader show/>
      : auth.roles?.find(role => allowedRoles?.includes(role))
        ? <Outlet />
        : <AccessDenied/>
  );
}