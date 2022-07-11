import styled from "styled-components";
import '../styles/app.css';

export const Wrapper = styled.div`
    background-color: var(--authorization-background-color);
    height: 100vh;
    padding: 40px 24px;
    text-align: center;
    font-family: 'Roboto', sans-serif;
    
    & > img {
        height: 80px;
        border-radius: 50%;
    }
    
    @media screen and (min-width: 768px) {
        width: 400px;
        margin: 100px auto;
        height: unset;
        border-radius: 16px;
        padding: 40px 32px 24px;
    }
    
    @media screen and (min-width: 1024px) {
        width: 400px;
        margin: 120px auto;
        padding: 40px 32px 24px;
    }
`

export const Header = styled.h2`
`