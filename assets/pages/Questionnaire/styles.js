import styled from "styled-components";
import '../../styles/app.css';

export const Wrapper = styled.div`
  font-family: var(--font-primary);
  margin: 16px;

  @media (min-width: 768px) {
    margin: 40px 16px;
  }

  @media (min-width: 1024px) {
    margin: 40px;
  }

  @media (min-width: 1280px) {
    max-width: 1200px;
    margin: 40px auto;
  }
`

export const Header = styled.div`
    margin-bottom: 24px;
    
    & > *:first-child {
      margin-bottom: 8px;
    }
`

export const Main = styled.div`
  & > *:first-child {
    margin-bottom: 8px;
  }

  background-color: var(--authorization-background-color);
  box-shadow: 0 2px 4px rgb(135 145 151 / 24%);
  padding: 24px;
  border-radius: 16px;
`

export const ArtefactBlock = styled.div`
    margin-top: 32px;
`

export const TextBlock = styled.div`
  margin-bottom: 16px;
  
  & > *:first-child {
    margin-bottom: 8px;
  }
`

export const ButtonBlock = styled.div`
  display: flex;
  margin-top: 32px;
  justify-content: right;
  
  & > button {
    width: unset;
  }
`
