import styled from "styled-components";
import '../../styles/app.css';

export const MyProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
  background-color: #FFFFFF;
  box-shadow: 0 2px 4px rgb(135 145 151 / 24%);
  border-radius: 8px;
  padding: 16px;
  margin-top: 24px;

  @media (min-width: 768px) {
    flex-direction: row;
  }

  @media (min-width: 1024px) {
    padding: 24px;
    margin-top: 32px;
  }

  @media (min-width: 1440px) {
    padding: 32px;
  }
`

export const MyProfile = styled.div`
`

export const Rating = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  flex-shrink: 0;
  background-color: #F5F5F5;
  border-radius: 8px;
  text-align: center;
  padding: 16px;

  @media (min-width: 768px) {
    width: 200px;
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
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  & > button {
      width: unset;
  }

  @media (min-width: 768px) {
    margin-top: 48px;
  }

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`
