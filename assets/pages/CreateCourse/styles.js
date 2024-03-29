import styled from "styled-components";
import '../../styles/app.css';

export const Wrapper = styled.div`
  margin: 56px 0;

  @media (min-width: 1024px) {
    margin: 80px 0;
  }

  @media (min-width: 1280px) {
    max-width: 1200px;
    margin: 80px auto;
  }
`

export const Header = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
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

export const Hint = styled.div`
  margin-top: 8px;
`

export const CheckBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const CheckBoxControled = styled.div`
  margin-top: 24px;
`

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  & > *:first-child, *:last-child {
    flex-shrink: 0;
  }
`

export const ButtonsBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  gap: 8px;
  
  @media(min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`

export const MovementButtons = styled.div`
  margin-bottom: 24px;
  border-bottom: 1px solid #BFBFBF;
  padding-bottom: 24px;
`

export const StepActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media(min-width: 768px) {
    flex-direction: row;
  }
`