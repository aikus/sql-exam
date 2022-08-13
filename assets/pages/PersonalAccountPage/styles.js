import styled from "styled-components";
import '../../styles/app.css';

export const Wrapper = styled.div`
    font-family: var(--font-primary);
    margin: 0 16px;
    
    & > section {
        margin: 40px 0;
    }
    
    @media (min-width: 768px) {
        margin: 0 40px;
    }
    
    @media (min-width: 1024px) {
        & > section {
            margin: 80px 0;
        }
    }
    
    @media (min-width: 1280px) {
        max-width: 1200px;
        margin: auto;
    }
`

export const NavBar = styled.div`
    display: flex;
    align-items: center;
    height: 50px;
    background-color: #FFFFFF;
    box-shadow: 0 2px 4px rgb(135 145 151 / 24%);
    
    & > img {
        height: 40px;
        margin-left: 16px;
    }
`

export const NavBarItemsBox = styled.div`
    display: flex;
    gap: 24px;
    margin-left: 24px;
`

export const NavBarItem = styled.div`
`