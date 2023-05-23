import React from 'react';
import {Typography} from "@mui/material";

export const Title = ({children}) => {

  return <Typography
    sx={{
      fontSize: '2rem'
    }}
  >
    {children}
  </Typography>;
}