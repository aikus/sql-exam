import React from 'react';
import styled from 'styled-components'
import '../../styles/app.css';

export const Button = ({children, disabled}) => {
    return (
        <ButtonComponent disabled={disabled}>{children}</ButtonComponent>
    )
}

const ButtonComponent = styled.button`
    font-family: var(--font-primary);
    background-color: #FFCC00;
    color: var(--text-color-primary);
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    line-height: 140%;
    letter-spacing: 0.3px;
    padding: 16px 48px;
    border: 2px solid transparent;
    width: 100%;

    &:hover {
        background-color: #FAC000;
        cursor: pointer;
    }
    
    &:disabled {
        cursor: wait;
        &:hover {
            background-color: #FFCC00;
        }
    }
`

