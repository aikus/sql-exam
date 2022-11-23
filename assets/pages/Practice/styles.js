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
  & > div:first-child {
    margin-bottom: 1rem;
  }
`

export const Task = styled.div`
  display: flex;
  gap: 16px;
  
  @media (min-width: 768px)  {
    gap: 24px;
  }
`

export const LeftBlock = styled.div`
    width: 70%;
  @media (min-width: 768px)  {
    box-shadow: .70rem 0 0 0 #f8f9f9,
                .75rem 0 0 0 #999;
  }
`

export const Question = styled.div`
  margin: 16px 0;
  
  & > span {
    white-space: break-spaces;
  }
`

export const Description = styled.div`
    margin-bottom: 1rem;
`

export const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: space-between;
  
  & > div:first-child {
    display: flex;
    gap: 8px;
  }
  
  & * button, & > button {
    width: unset;
  }
  
  & > button {
    align-self: flex-start;
  }

  @media (min-width: 768px) {
    flex-direction: row;
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

export const Block = styled.div`
  margin-top: 1.5rem;
`

export const TopBlock = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
  
  & > div:first-child {
    width: 70%;
  }
  
  & > div:last-child {
    width: 30%;
  }
`

export const Timer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  border: 2px solid ${props => props.changeBC ? '#ED1C24' : '#262626'};
  border-radius: 8px;
  padding: 8px;
  box-sizing: border-box;
  
  &:hover {
    cursor: pointer;
  }
`

export const ClosedTimer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: auto;
`