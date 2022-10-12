import styled from "styled-components";
import '../../styles/app.css';

export const Wrapper = styled.div`
  margin: 16px 0;
  
  @media (min-width: 768px) {
    margin: 40px 0;
  }

  @media (min-width: 1280px) {
    max-width: 1200px;
    margin: 40px auto;
  }
`

export const Main = styled.div`
  background-color: var(--authorization-background-color);
  box-shadow: 0 2px 4px rgb(135 145 151 / 24%);
  padding: 24px;
  border-radius: 16px;
  margin-top: 24px;
`

export const FirstStep = styled.div`
  & > button {
    width: unset;
    margin-top: 32px;
  }
`

export const FieldBox = styled.div`
  margin-bottom: 24px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  & > *:first-child {
    margin-bottom: 8px;
  }
`

export const CheckBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const CheckBoxControled = styled.div`
  margin-top: 24px;
`

export const Type = styled.div`
`