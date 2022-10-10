import styled from "styled-components";
import '../../styles/app.css';

export const MyProfileBox = styled.div`
    margin-top: 24px;
    
    @media (min-width: 1024px) {
        margin-top: 32px;
    }
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
  display: flex;
  flex-direction: column;
  
  & > span {
    margin-bottom: 8px;
  }
`

export const ButtonBox = styled.div`
    margin-top: 48px;
    display: flex;
  flex-direction: column;
    gap: 16px;
    
    & > button {
        width: unset;
    }

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`
