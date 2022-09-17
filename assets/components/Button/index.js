import React from 'react';
import styled from 'styled-components'
import '../../styles/app.css';

export const Button = ({children, disabled, type, size}) => {
    return (
        <>
            {!type &&
                <StandardButton disabled={disabled} size={size}>{children}</StandardButton>
            }
            {type === 'outlined' &&
                <OutlinedButton disabled={disabled} size={size}>{children}</OutlinedButton>
            }
        </>
    )
}

const StandardButton = styled.button`
    font-family: var(--font-primary);
    background-color: #FFCC00;
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
        background-color: #FAC000;
        cursor: pointer;
    }
    
    &:disabled {
        opacity: 0.6;
      
        &:hover {
            background-color: #FFCC00;
            cursor: default;
        }
    }
`

const OutlinedButton = styled(StandardButton)`
    background-color: transparent;
    letter-spacing: 0.3px;
    border: 1px solid #FFCC00;

    &:hover {
        background-color: #FAC000;
        border-color: #FAC000;
    }
    
    &:disabled {
        &:hover {
            background-color: transparent;
        }
    }
`

