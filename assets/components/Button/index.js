import React from 'react';
import styled from 'styled-components'
import '../../styles/app.css';

export const Button = (props) => {
    const view = props.view
    const disabled = props.disabled
    const size = props.size
    const children = props.children

    return (
        <>
            {!view &&
                <StandardButton {...props} disabled={disabled} size={size}>{children}</StandardButton>
            }
            {view === 'outlined' &&
                <OutlinedButton {...props} disabled={disabled} size={size}>{children}</OutlinedButton>
            }
        </>
    )
}

const StandardButton = styled.button`
    font-family: var(--font-primary);
    background-color: var(--button-color);
    color: var(--text-color-primary);
    border-radius: 8px;
    font-size: ${props => props.size === 'S' ? '14px' : '16px'};
    font-weight: 700;
    line-height: 140%;
    letter-spacing: 0.3px;
    padding: ${props => props.size === 'S' ? '8px 16px' : '16px 48px'};
    border: 2px solid transparent;
    width: 100%;

    &:hover {
        background-color: var(--hover-button-color);
        cursor: pointer;
    }
    
    &:disabled {
        opacity: 0.6;
      
        &:hover {
            background-color: var(--button-color);
            cursor: default;
        }
    }
`

const OutlinedButton = styled(StandardButton)`
    background-color: transparent;
    letter-spacing: 0.3px;
    border: 1px solid var(--button-color);

    &:hover {
        background-color: var(--hover-button-color);
        border-color: var(--hover-button-color);
    }
    
    &:disabled {
        &:hover {
            background-color: transparent;
        }
    }
`

