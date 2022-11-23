import React from 'react';
import * as C from './styles'
import {Accordion, AccordionSummary, AccordionDetails, ButtonGroup, Button, Grid, Stack} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import arrowRight from './arrow-right.svg'
import { H2, TextL } from '../../../components/Typography'
import {useNavigate} from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

export const CourseBlock = ({id, items, title, mainButton, resultButton}) => {
    const navigate = useNavigate();
    const goToPractice = id => {
        navigate(`/react/my-profile/practice?course=${id}`)
    }

    const goToCourse = id => {
        navigate(`/react/my-profile/course-result?course=${id}`)
    }

    return 0 === items.length ? <></> : (
        <>
          <C.HeaderBlock>
              <H2>{title}</H2>
              <C.SeeAll>
                  <a href={'#'}>
                      <div>Посмотреть всё</div>
                      <img src={arrowRight}/>
                  </a>
              </C.SeeAll>
          </C.HeaderBlock>
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
                      <Stack direction="row" justifyContent={"flex-start"} spacing={2} sx={{marginBottom: "2rem"}}>
                          {mainButton && <Button size='S' variant={"contained"} onClick={() => goToPractice(item.id)}>
                              {mainButton}
                        </Button>}
                          {resultButton && <Button size='S' variant={"contained"} color={"inherit"} onClick={() => goToCourse(item.id)}>
                            {resultButton}
                        </Button>}
                      </Stack>
                      <C.Description>
                        <TextL>{item.description}</TextL>
                      </C.Description>
                    </AccordionDetails>
                  </Accordion>
                )
              })}
            </C.AccordionBlock>

        </>
    )
}

