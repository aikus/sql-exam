import React from 'react';
import styled from 'styled-components'
import '../../styles/app.css';

export const ButtonCust = (props) => {
    const variant = props.variant;
    const size = props.size;
    const children = props.children;
    const title = props.title;

    return (
        <>
            {!variant &&
              <StandardButton {...props} size={size} title={title}>{children}</StandardButton>
            }
            {variant === 'outlined' &&
              <OutlinedButton {...props} size={size} title={title}>{children}</OutlinedButton>
            }
            {variant === 'text' &&
              <TextButton {...props} size={size} title={title}>{children}</TextButton>
            }
            {variant === 'white' &&
              <WhiteButton {...props} size={size} title={title}>{children}</WhiteButton>
            }
        </>
    )
}

const StandardButton = styled.button`
    font-family: var(--font-primary);
    background-color: var(--button-color);
    color: var(--text-color-primary);
    border-radius: 8px;
    font-size: ${props => props.size === 'l' ? '16px' : '14px'};
    font-weight: 700;
    line-height: 140%;
    letter-spacing: 0.3px;
    padding: ${props => props.size === 'l' ? '16px 48px' : '8px 16px'};
    border: 1px solid transparent;

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

const TextButton = styled(StandardButton)`
    background-color: transparent;

    &:hover {
        background-color: #F6FAFD;
    }

    &:disabled {
        &:hover {
            background-color: transparent;
        }
    }
`

const WhiteButton = styled(StandardButton)`
    background-color: #FFFFFF;
    box-shadow: 0 1px 8px rgb(99 90 82 / 20%);

    &:hover {
        background-color: var(--hover-button-color);
        border-color: var(--hover-button-color);
    }
    
    &:disabled {
        &:hover {
            background-color: #FFFFFF;
            border-color: #FFFFFF;
        }
    }
`

