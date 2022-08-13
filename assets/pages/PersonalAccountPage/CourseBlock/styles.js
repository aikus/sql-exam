import styled from "styled-components";
import '../../../styles/app.css';

export const HeaderBlock = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    
    & > h2 {
        margin: 0;
    }
`

export const SeeAll = styled.div`
    & > a {
        display: flex;
        gap: 8px;
        text-decoration: none;
        color: var(--link-color-primary);
    
        &:hover {
            color: var(--link-color-hover-primary);
            cursor: pointer;
        }
    }
    
    @media (min-width: 1024px) {
    }
    
    @media (min-width: 1440px) {
    }
`

export const AccordionBlock = styled.div`
    margin-top: 16px;
    
    @media (min-width: 1024px) {
        margin-top: 24px;
    }
`

export const Description = styled.div`
    display: flex;
    justify-content: space-between;
    
    @media (min-width: 1024px) {
        padding: 0 8px 8px;
    }
    
    @media (min-width: 1440px) {
        padding: 0 16px 16px;
    }
`

export const ButtonWrapper = styled.div`
    flex-shrink: 0;
    margin-left: 48px;
`

export const Button = styled.button`
    font-family: var(--font-primary);
    background-color: #FFCC00;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    padding: 16px 48px;

    &:hover {
        background-color: #FAC000;
        cursor: pointer;
    }
`

export const Title = styled.div`
    padding: 4px 0;
    
    @media (min-width: 1024px) {
        padding: 12px 8px;
    }
    
    @media (min-width: 1440px) {
        padding: 20px 16px;
    }
`
