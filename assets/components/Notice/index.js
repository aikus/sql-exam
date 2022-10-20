import React from 'react';
import {Alert, AlertTitle} from "@mui/material";

export const Notice = ({message}) => {

    return (
        <>
            {message && <Alert severity={ message?.status === 400 ? "warning" : "error" }>
                <AlertTitle>{message?.status} {message?.statusText}</AlertTitle>
                {message?.body?.message}
            </Alert>}
        </>
    )
}
