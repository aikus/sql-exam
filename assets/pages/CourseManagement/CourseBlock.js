import React, { useState } from 'react';
import * as C from './styles'
import { Menu, MenuItem, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Button} from "../../components/Button";
import { H2, TextL } from '../../components/Typography'
import {useNavigate} from "react-router-dom";
import {LoaderInBLock} from "../../components/Loader/LoaderInBLock";

export const CourseBlock = ({items}) => {
  const navigate = useNavigate();

  const editCourse = (courseId) => {
    navigate(`/react/my-profile/create-course?course=${courseId}`)
  }

  return (
    <>
      {!items.length &&
        <C.LoadingBlock>
          <LoaderInBLock show={true}/>
        </C.LoadingBlock>
      }
      <C.AccordionBlock>
        {items.map((item, i) => {
          return (
            <Accordion key={i}>
              <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
              >
                <C.Title><TextL>{item.name}</TextL></C.Title>
              </AccordionSummary>
              <AccordionDetails>
                <C.Description>
                  <TextL>{item.description}</TextL>
                  <C.ButtonWrapper>
                    <Button
                      size={'S'}
                      onClick={() => editCourse(item.id)}
                    >Редактирование</Button>
                    <Button
                      size={'S'}
                      view={'outlined'}
                    >Удалить</Button>
                  </C.ButtonWrapper>
                </C.Description>
              </AccordionDetails>
            </Accordion>
          )
        })}
      </C.AccordionBlock>
    </>
  )
}

