import React, { useState } from 'react';
import * as C from './styles'
import { Menu, MenuItem, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import arrowRight from './arrow-right.svg'

export const CourseBlock = ({id, header, link, items}) => {

    return (
        <>
            <C.HeaderBlock>
                <h2>{header}</h2>
                <C.SeeAll>
                    <a href={link}>
                        <div>Посмотреть всё</div>
                        <img src={arrowRight}/>
                    </a>
                </C.SeeAll>
            </C.HeaderBlock>
            <C.AccordionBlock>
                {items.map((item, i) => {
                    return (
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={id + '-' + i + '-content'}
                                id={id + '-' + i + '-header'}
                            >
                                <C.Title>{item.title}</C.Title>
                            </AccordionSummary>
                            <AccordionDetails>
                                <C.Description>
                                    <div>{item.description}</div>
                                    {item.linkToStart &&
                                        <C.ButtonWrapper>
                                            <C.Button>Начать прохождение</C.Button>
                                        </C.ButtonWrapper>
                                    }
                                </C.Description>
                            </AccordionDetails>
                        </Accordion>
                    )
                })}
            </C.AccordionBlock>
        </>
    )
}

