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

export const Link = styled.a`
  & > span {
    color: var(--link-color-primary);
    text-decoration: underline;

    &:hover {
      color: var(--link-color-hover-primary);
      cursor: pointer;
    }
  }
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: 24px 0;
`

export const Main = styled.div`
  background-color: var(--authorization-background-color);
  box-shadow: 0 2px 4px rgb(135 145 151 / 24%);
  padding: 24px;
  border-radius: 16px;
`

export const Task = styled.div`
  display: flex;
  gap: 16px;
  
  @media (min-width: 1024px)  {
    gap: 24px;
  }
`

export const LeftBlock = styled.div`
    width: 70%;
`

export const Question = styled.div`
    margin: 16px 0;
`

export const Description = styled.div`
`

export const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 16px;
  justify-content: space-between;
  
  & > div:first-child {
    display: flex;
    gap: 8px;
  }
  
  & * button, & > button {
    width: unset;
  }
`

export const RightBlock = styled.div`
    width: 30%;
`

export const TableWrapper = styled.div`
  margin-top: 32px;
  
  & > div:last-child {
    margin-top: 4px;
  }
`






