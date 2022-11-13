import React, { useState } from 'react';
import * as C from './styles'
import { Menu, MenuItem, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import arrowRight from './arrow-right.svg'
import {Button} from "../../../components/Button";
import { H2, TextL } from '../../../components/Typography'
import {useNavigate} from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

export const CourseBlock = ({id, items}) => {
    const navigate = useNavigate();
    const goToPractice = id => {
        navigate(`/react/my-profile/practice?course=${id}`)
    }

    const goToCourse = id => {
        navigate(`/react/my-profile/course-result?course=${id}`)
    }

    return (
        <>
          <C.HeaderBlock>
              <H2>Доступные курсы</H2>
              <C.SeeAll>
                  <a href={'#'}>
                      <div>Посмотреть всё</div>
                      <img src={arrowRight}/>
                  </a>
              </C.SeeAll>
          </C.HeaderBlock>
          {items.length === 0 &&
            <Skeleton variant="rectangular" animation="wave" height={80} sx={{marginTop: '24px', borderRadius: '4px'}}/>
          }
          {items.length !== 0 &&
            <C.AccordionBlock>
              {items.map((item, i) => {
                return (
                  <Accordion key={i}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={id + '-' + i + '-content'}
                      id={id + '-' + i + '-header'}
                    >
                      <C.Title><TextL>{item.name}</TextL></C.Title>
                    </AccordionSummary>
                    <AccordionDetails>
                      <C.Description>
                        <TextL>{item.description}</TextL>
                        <C.ButtonWrapper>
                          <Button size={'S'} onClick={() => goToPractice(item.id)}>Начать прохождение</Button>
                          <Button size={'S'} onClick={() => goToCourse(item.id)}>Результаты</Button>
                        </C.ButtonWrapper>
                      </C.Description>
                    </AccordionDetails>
                  </Accordion>
                )
              })}
            </C.AccordionBlock>
          }

        </>
    )
}

