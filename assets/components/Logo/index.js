import React from 'react'
import logo from './logo-1.jpg'

export const Logo = ({onClick, style}) => {
    return (
        <img
            alt="Scirpus"
            src={logo}
            style={{cursor: 'pointer', ...style}}
            onClick={onClick}
        />
    )
}