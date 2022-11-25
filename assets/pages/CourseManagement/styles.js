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

export const CreateCourse = styled.div`
  margin: 24px 0 48px;
  
  & > button {
    width: unset;
  }
`

export const CourseList = styled.div`
`

export const AccordionBlock = styled.div`
    margin-top: 24px;
`

export const LoadingBlock = styled.div`
  display: flex;
  justify-content: center;
  background-color: var(--authorization-background-color);
  box-shadow: 0 2px 4px rgb(135 145 151 / 24%);
  padding: 32px;
  border-radius: 8px;
  margin-top: 24px;
`

export const Description = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

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
  display: flex;
  flex-shrink: 0;
  align-items: start;
  gap: 8px;
  margin-top: 16px;
  
  & > button {
    width: unset;
  }

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
