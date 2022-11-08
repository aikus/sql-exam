import styled from "styled-components";
import '../../styles/app.css';

export const Wrapper = styled.div`
    font-family: var(--font-primary);
    margin: 0 16px;
    
    & > section {
        margin: 56px 0;
    }
    
    @media (min-width: 1024px) {
      margin: 0 40px;
        & > section {
            margin: 80px 0;
        }
    }
    
    @media (min-width: 1280px) {
        max-width: 1200px;
        margin: auto;
        
        & > section {
            margin: 100px 0;
        }
    }
`

export const NavBar = styled.div`
  display: flex;
  background-color: #FFFFFF;
  box-shadow: 0 2px 4px rgb(135 145 151 / 24%);
  align-items: stretch;
`

export const LogoBlock = styled.div`
  display: flex;
  flex-grow: 0;
  gap: 8px;
  align-items: center;
  margin: 8px;
  
  & > img {
    border-radius: 50%;
    height: 40px;
  }
  
  &:hover {
    cursor: pointer;
  }
`

export const NavBarItemsBox = styled.div`
  display: flex;
  gap: 24px;
  margin-left: 24px;
  flex-grow: 1;
  
  & > a {
    display: flex;
    align-items: center;
    border-top: 4px solid transparent;
    text-decoration: none;
    color: var(--text-color-primary);

    &:hover {
      border-bottom: 4px solid var(--hover-button-color);
      border-top: none;
      cursor: pointer;
    }
  }
`

export const MenuBlock = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 0;
  
  &:hover {
    cursor: pointer;
  }
`

export const Avatar = styled.div`
  display: flex;
  
  & > img {
    width: 40px;
    height: 40px;
    box-sizing: border-box;
    border-radius: 50%;
    border: 1px solid var(--text-color-primary);
    transition: 0.5s;
    
    &:hover {
      transform: rotate(360deg);
    }
  }
`