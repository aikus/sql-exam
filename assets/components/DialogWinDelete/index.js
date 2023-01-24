import React from 'react';
import styled from 'styled-components'
import '../../styles/app.css';
import {H4} from "../Typography";
import {Dialog, Button} from "@mui/material";

export const DialogWinDelete = ({isOpen, handleDelete, handleClose, whatToDelete}) => {

    return (
      <Dialog
        open={isOpen}
        onClose={handleClose}
      >
          <DialogContent>
              <H4>Вы действительно ходите удалить этот {whatToDelete}?</H4>
              <DialogButtonWrap>
                  <Button
                    variant='outlined'
                    size='medium'
                    onClick={handleDelete}
                  >Да</Button>
                  <Button
                    variant='contained'
                    size='medium'
                    onClick={handleClose}
                  >Нет</Button>
              </DialogButtonWrap>
          </DialogContent>
      </Dialog>
    )
}

const DialogContent = styled.div`
    padding: 24px;
`

const DialogButtonWrap = styled.div`
    display: flex;
    gap: 16px;
    margin-top: 24px;
    
    & > button {
        width: 100%;
    }
`


