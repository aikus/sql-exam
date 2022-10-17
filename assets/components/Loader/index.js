import React from 'react';
import styled from 'styled-components'
import '../../styles/app.css';
import {CircularProgress} from "@mui/material";

export const Loader = ({show}) => {

  return (
    <>
      {show &&
        <Container>
          <CircularProgress />
        </Container>
      }
    </>
  )
}

const Container = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0, 0.2);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  animation: ani 1s forwards;

  @keyframes ani {
    0% {opacity: 0;}
    100% {opacity: 1;}
  }
`

