import styled from "styled-components";
import '../../../styles/app.css';

export const MyProfileBox = styled.div`
`

export const MyProfile = styled.div`
    background-color: #FFFFFF;
    box-shadow: 0 2px 4px rgb(135 145 151 / 24%);
    border-radius: 8px;
    padding: 16px;
    
    @media (min-width: 1024px) {
        padding: 24px;
    }
    
    @media (min-width: 1440px) {
        padding: 32px;
    }
`

export const Text = styled.div`
    & > p {
        margin-top: 0;
    }
`

export const ButtonBox = styled.div`
    margin-top: 48px;
    display: flex;
    gap: 16px;
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
