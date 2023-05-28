import React from 'react';
import styled from 'styled-components'
import Alert from '@mui/material/Alert';
import '../../styles/app.css';

export const AccessDenied = () => {
    return (
      <Wrapper>
          <Alert severity="error">У вас недостаточно прав, чтобы просматривать эту страницу!</Alert>
      </Wrapper>
    )
}

const Wrapper = styled.div`
  background-color: #FFFFFF;
  box-shadow: 0 2px 4px rgb(135 145 151 / 24%);
  border-radius: 8px;
  padding: 24px;
  margin: 56px 0;
  
  @media(min-width: 1024px) {
    margin: 80px 0;
  }

  @media(min-width: 1280px) {
    margin: 100px 0;
  }
`
