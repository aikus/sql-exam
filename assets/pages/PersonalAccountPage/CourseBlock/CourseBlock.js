import React, { useState } from 'react';
import * as C from './styles'
import { Menu, MenuItem, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import arrowRight from './arrow-right.svg'
import {Button} from "../../../components/Button";
import { H2, TextL } from '../../../components/Typography'

export const CourseBlock = ({id, header, link, items}) => {

    return (
        <>
            <C.HeaderBlock>
                <H2>{header}</H2>
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
                        <Accordion key={i}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={id + '-' + i + '-content'}
                                id={id + '-' + i + '-header'}
                            >
                                <C.Title><TextL>{item.title}</TextL></C.Title>
                            </AccordionSummary>
                            <AccordionDetails>
                                <C.Description>
                                    <TextL>{item.description}</TextL>
                                    {item.linkToStart &&
                                        <C.ButtonWrapper>
                                            <Button>Начать прохождение</Button>
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

