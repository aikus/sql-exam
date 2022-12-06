import React from 'react';
import * as C from './styles'
import {Accordion, AccordionSummary, AccordionDetails, Skeleton, Button} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import arrowRight from './arrow-right.svg'
import { H2, TextL } from '../../../components/Typography'
import {useNavigate} from "react-router-dom";

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
                                      <Button variant='contained' size='medium' onClick={() => goToPractice(item.id)}>{mainButton}</Button>
                                    }
                                    {resultButton &&
                                      <Button variant='outlined' size='medium' onClick={() => goToCourseResult(item.id)}>{resultButton}</Button>
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

