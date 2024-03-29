import styled from "styled-components";
import '../../styles/app.css';

export const Wrapper = styled.div`
    background-color: var(--authorization-background-color);
    box-shadow: 0 2px 4px rgb(135 145 151 / 24%);
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
        height: 100px;
        border-radius: 50%;
    }

    @media screen and (min-width: 1024px) {
      & > img {
        height: 120px;
      }
    }
`

export const Header = styled.div`
    margin: 20px 0;
`

export const ForgotPassword = styled.div`
    display: inline-flex;
    color: var(--link-color-primary);
    margin-top: 4px;
    
    &:hover {
        color: var(--link-color-hover-primary);
        cursor: pointer;
    }
`

export const ButtonBox = styled.div`
  width: 100%;
  margin-top: 24px;
  
  & > button {
    width: 100%;
  }
`

export const ButtonReg = styled(ButtonBox)`
  margin-top: 40px;

  & > button {
    width: 100%;
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

export const RegistrationLink = styled.div`
    display: inline-flex;
    color: var(--link-color-primary);
    text-decoration: underline;
    
    &:hover {
        color: var(--link-color-hover-primary);
        cursor: pointer;
    }
`

export const Backspace = styled(ForgotPassword)`
    display: block;
    text-align: center;
    margin-top: 24px;
`

export const EmailSentBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  border: 1px solid green;
  border-radius: 16px;
  padding: 32px 16px;
  text-align: center;
  margin-top: 40px;
  
  & > *:first-child {
    width: 60px;
    height: 60px;
  }
`

export const RegisteredSuccessfully = styled(EmailSentBlock)`
`
