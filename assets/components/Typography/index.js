import styled from 'styled-components'
import '../../styles/app.css';

export const H1 = styled.h1`
  font-family: var(--font-primary);
  margin: 0;
  font-size: 28px;
  line-height: 130%;
  letter-spacing: 0.3px;
  color: var(--text-color-primary);
  word-break: break-word;
  
  @media(min-width: 768px) {
    font-size: 42px;
    line-height: 120%;
  }
`

export const H2 = styled.h2`
  font-family: var(--font-primary);
  margin: 0;
  font-size: 22px;
  line-height: 130%;
  letter-spacing: 0.3px;
  color: var(--text-color-primary);
  word-break: break-word;
  
  @media (min-width: 768px){
    font-size: 34px;
    line-height: 140%;
  }
`

export const H3 = styled.h3`
  font-family: var(--font-primary);
  margin: 0;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: 0.3px;
  color: var(--text-color-primary);
  word-break: break-word;
  
  @media (min-width: 768px){
    font-size: 24px;
  }
`

export const H4 = styled.h4`
  font-family: var(--font-primary);
  margin: 0;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0.3px;
  color: var(--text-color-primary);
  word-break: break-word;
  
  @media (min-width: 768px){
    font-size: 20px;
  }
`

export const H5 = styled.h5`
  font-family: var(--font-primary);
  margin: 0;
  font-size: 14px;
  line-height: 140%;
  letter-spacing: 0.3px;
  color: var(--text-color-primary);
  word-break: break-word;
  
  @media (min-width: 768px){
    font-size: 16px;
  }
`

export const TextL = styled.span`
  font-family: var(--font-primary);
  margin: 0;
  font-size: 14px;
  line-height: 170%;
  letter-spacing: 0.3px;
  color: var(--text-color-primary);
  word-break: break-word;

  @media (min-width: 768px){
    letter-spacing: 0.4px;
    font-size: 16px;
  }
`

export const TextM = styled.span`
  font-family: var(--font-primary);
  margin: 0;
  font-size: 12px;
  line-height: 170%;
  letter-spacing: 0.3px;
  color: var(--text-color-primary);
  word-break: break-word;

  @media (min-width: 768px){
    font-size: 14px;
  }
`

export const TextS = styled.span`
  font-family: var(--font-primary);
  margin: 0;
  font-size: 10px;
  line-height: 170%;
  letter-spacing: 0.3px;
  color: var(--text-color-primary);
  word-break: break-word;

  @media (min-width: 768px){
    font-size: 12px;
  }
`

