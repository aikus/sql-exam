import React, { useState } from 'react';
import * as C from './styles'
import { Menu, MenuItem, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import arrowRight from './arrow-right.svg'
import {Button} from "../../../components/Button";
import { H2, TextL } from '../../../components/Typography'
import {useNavigate} from "react-router-dom";

export const CourseBlock = ({id, items}) => {
    const navigate = useNavigate();
    const goToPractice = id => {
        navigate(`/react/my-profile/practice?course=${id}`)
    }

    return (
        <>
            <C.HeaderBlock>
                <H2>В процессе</H2>
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
                                <C.Title><TextL>{item.description}</TextL></C.Title>
                            </AccordionSummary>
                            <AccordionDetails>
                                <C.Description>
                                    <TextL>ЗАГЛУШКА</TextL>
                                    <C.ButtonWrapper>
                                        <Button onClick={() => goToPractice(item.id)}>Начать прохождение</Button>
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

