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
  display: flex;
  background-color: var(--authorization-background-color);
  box-shadow: 0 2px 4px rgb(135 145 151 / 24%);
  padding: 24px;
  border-radius: 16px;
`

export const LeftBlock = styled.div`
`

export const Question = styled.div`
    margin: 16px 0;
`

export const Description = styled.div`
`

export const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  
  & > button {
    width: unset;
  }
`

export const RightBlock = styled.div`
    width: 700px;
  height: 700px;
`







