import styled from "styled-components";
import '../../../styles/app.css';

export const Base = styled.div`
  display: flex;
  background-color: var(--authorization-background-color);
  box-shadow: 0 2px 4px rgb(135 145 151 / 24%);
  padding: 32px 0;
  border-radius: 8px;
  margin-top: 24px;
  
  & > div:first-child {
    width: 40%;
  }

  @media (min-width: 425px) {
    & > div:first-child {
      width: unset;
    }
  }
`

export const HeaderBlock = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    
    & > h2 {
        margin: 0;
    }
`

export const NoContent = styled.div`
  width: 100%;
  text-align: center;
`

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin: 0 16px;

  @media screen and (min-width: 1024px) {
    margin: 0 24px 0 16px;
  }

  @media screen and (min-width: 1440px) {
    margin: 0 32px 0 16px;
  }
`