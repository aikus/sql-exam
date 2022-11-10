import styled from "styled-components";
import '../../../styles/app.css';

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
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 768px) {
    flex-direction: row;
  }
  
  @media (min-width: 1024px) {
      padding: 0 8px 8px;
  }
  
  @media (min-width: 1440px) {
      padding: 0 16px 16px;
  }
`

export const ButtonWrapper = styled.div`
  flex-shrink: 0;
  margin-top: 16px;
  
  @media (min-width: 768px) {
    margin-left: 48px;
    margin-top: 0;
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
