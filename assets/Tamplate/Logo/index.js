import React from 'react'
import logo from './src/logo-1.jpg'
import * as C from "/assets/Tamplate/Logo/styles";
import { Link, Typography } from "@mui/material";

export const Logo = ({variant, style}) => {

    const getWrapper = content => {
        return <Link
            color="#262626"
            underline="none"
            href={"/react"}
        >
            <C.LogoBlock>
                {content}
                <Typography component="div" sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
                    Scirpus
                </Typography>
            </C.LogoBlock>
        </Link>
    }

    return getWrapper((
        <img
            alt="Scirpus"
            src={logo}
            style={{
                cursor: 'pointer',
                borderRadius: '50%',
                maxHeight: '40px',
                ...style
            }}
        />))
}