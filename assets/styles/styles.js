import styled from "styled-components";
import '/assets/styles/app.css';

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

export const Header = styled.div`
  margin: 24px 0;
`

