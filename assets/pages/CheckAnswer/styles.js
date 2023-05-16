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

export const QuestionBlock = styled.div`
  & > *:first-child {
    margin-bottom: 8px;
  }
`

export const MovementButtons = styled.div`
  margin-bottom: 24px;
  border-bottom: 1px solid #BFBFBF;
  padding-bottom: 24px;
`
export const Type = styled.div`
  margin-bottom: 24px;
  
  & > *:first-child {
    margin-bottom: 8px;
  }
`

export const HeaderBlock = styled(Type)`
`