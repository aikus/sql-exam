import React from 'react';
import * as C from './styles'
import {Accordion, AccordionSummary, AccordionDetails, Skeleton} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import arrowRight from './arrow-right.svg'
import { H2, TextL } from '../../../components/Typography'
import {useNavigate} from "react-router-dom";
import {ButtonCust} from '../../../components/Button'

export const CourseBlock = ({id, items, title, mainButton, resultButton, noCourseText}) => {
    const navigate = useNavigate();
    const goToPractice = id => {
        navigate(`/react/my-profile/practice?course=${id}`)
    }

    const goToCourseResult = id => {
        navigate(`/react/my-profile/course-result?course=${id}`)
    }

    return (
      <>
        <C.HeaderBlock>
          <H2>{title}</H2>
          {/*<C.SeeAll>*/}
          {/*    <a href={'#'}>*/}
          {/*        <div>Посмотреть всё</div>*/}
          {/*        <img src={arrowRight}/>*/}
          {/*    </a>*/}
          {/*</C.SeeAll>*/}
        </C.HeaderBlock>
        {items === null &&
          <Skeleton variant="rectangular" animation="wave" height={80} sx={{marginTop: '24px', borderRadius: '4px'}}/>
        }
        {items !== null && !items.length &&
          <C.LoadingBlock>
              <TextL>{noCourseText}</TextL>
          </C.LoadingBlock>
        }
        {items !== null && Boolean(items.length) &&
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
                                <C.Buttons>
                                    {mainButton &&
                                      <ButtonCust onClick={() => goToPractice(item.id)}>{mainButton}</ButtonCust>
                                    }
                                    {resultButton &&
                                      <ButtonCust onClick={() => goToCourseResult(item.id)} variant='outlined'>{resultButton}</ButtonCust>
                                    }
                                </C.Buttons>
                                <TextL>{item.description}</TextL>
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

