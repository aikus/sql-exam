import React from 'react'
import logo from './logo-1.jpg'

export const Logo = ({onClick}) => {
    return (
        <img
            alt="Scirpus"
            src={logo}
            style={{cursor: 'pointer'}}
            onClick={onClick}
        />
    )
}