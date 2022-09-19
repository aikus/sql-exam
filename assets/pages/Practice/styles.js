import styled from "styled-components";
import '../../styles/app.css';

export const Wrapper = styled.div`
  font-family: var(--font-primary);
  margin: 0 16px;

  & > section {
    margin: 56px 0;
  }

  @media (min-width: 768px) {
    margin: 0 40px;
  }

  @media (min-width: 1024px) {
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
  gap: 8px;
  margin-top: 16px;
  
  & > button {
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






