import React from 'react';
import styled from 'styled-components'
import '../../styles/app.css';
import * as C from "../../pages/CourseManagement/styles";
import {H4} from "../Typography";
import {ButtonCust} from "../Button";
import {Dialog} from "@mui/material";

export const DialogWinDelete = ({isOpen, handleDelete, handleClose, whatToDelete}) => {

    return (
      <Dialog
        open={isOpen}
        onClose={handleClose}
      >
          <DialogContent>
              <H4>Вы действительно ходите удалить этот {whatToDelete}?</H4>
              <DialogButtonWrap>
                  <ButtonCust
                    variant='outlined'
                    onClick={handleDelete}
                  >Да</ButtonCust>
                  <ButtonCust
                    onClick={handleClose}
                  >Нет</ButtonCust>
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


