import styled from "styled-components";
import '../styles/app.css';

export const Wrapper = styled.div`
    background-color: var(--authorization-background-color);
    height: 100vh;
    padding: 40px 24px;
    font-family: var(--font-primary);
    
    @media screen and (min-width: 768px) {
        width: 400px;
        margin: 100px auto;
        height: unset;
        border-radius: 16px;
        padding: 40px 32px;
    }
    
    @media screen and (min-width: 1024px) {
        margin: 120px auto;
    }
`

export const TopBlock = styled.div`
    text-align: center;
    
    & > img {
        height: 80px;
        border-radius: 50%;
    }
`

export const Header = styled.h2`
`

export const ForgotPassword = styled.div`
    display: inline-flex;
    color: var(--link-color-primary);
    text-decoration: none;
    margin-top: 24px;
    margin-top: 4px;
    
    &:hover {
        color: var(--link-color-hover-primary);
        cursor: pointer;
    }
`

export const Button = styled.button`
    font-family: var(--font-primary);
    background-color: #FFCC00;
    width: 100%;
    height: 44px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    line-height: 44px;
    margin-top: 24px;

    &:hover {
        background-color: #FAC000;
        cursor: pointer;
    }
`

export const RegistrationText = styled.div`
    margin-top: 24px;
    text-align: center;
    
    & > a {
        color: var(--link-color-primary);
        
        &:hover {
            color: var(--link-color-hover-primary);
        }
    }
`