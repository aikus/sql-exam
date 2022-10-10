import React, { useState } from 'react';
import * as C from './styles'
import { Menu, MenuItem, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Button} from "../../components/Button";
import { H2, TextL } from '../../components/Typography'
import {useNavigate} from "react-router-dom";

export const CourseBlock = ({items}) => {
    return (
        <>
            <C.AccordionBlock>
                {items.map((item, i) => {
                    return (
                        <Accordion key={i}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <C.Title><TextL>{item.title}</TextL></C.Title>
                            </AccordionSummary>
                            <AccordionDetails>
                                <C.Description>
                                    <TextL>{item.description}</TextL>
                                    <C.ButtonWrapper>
                                        <Button
                                          size={'S'}
                                          // onClick={() => navigate("/react/my-profile/practice")}
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

