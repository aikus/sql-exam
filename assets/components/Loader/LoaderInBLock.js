import React from 'react';
import styled from 'styled-components'
import '../../styles/app.css';
import {CircularProgress} from "@mui/material";

export const LoaderInBLock = ({show}) => {

  return (
    <>
      {show && <CircularProgress />}
    </>
  )
}

