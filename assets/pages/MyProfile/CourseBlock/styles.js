import styled from "styled-components";
import '../../../styles/app.css';

export const LoadingBlock = styled.div`
  display: flex;
  justify-content: center;
  background-color: var(--authorization-background-color);
  box-shadow: 0 2px 4px rgb(135 145 151 / 24%);
  padding: 32px;
  border-radius: 8px;
  margin-top: 24px;
`

export const HeaderBlock = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    
    & > h2 {
        margin: 0;
    }
`

export const SeeAll = styled.div`
  display: none;
  
  @media (min-width: 768px) {
    display: block;
    
    & > a {
      display: flex;
      gap: 8px;
      text-decoration: none;
      color: var(--link-color-primary);

      &:hover {
        color: var(--link-color-hover-primary);
        cursor: pointer;
      }
    }
  }
`

export const AccordionBlock = styled.div`
    margin-top: 24px;
    
    @media (min-width: 1024px) {
        margin-top: 32px;
    }
`

export const Description = styled.div`
  @media (min-width: 1024px) {
      padding: 0 8px 8px;
  }
  
  @media (min-width: 1440px) {
      padding: 0 16px 16px;
  }
`

export const Title = styled.div`
    padding: 4px 0;
    
    @media (min-width: 1024px) {
        padding: 12px 8px;
    }
    
    @media (min-width: 1440px) {
        padding: 20px 16px;
    }
`

export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 32px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`