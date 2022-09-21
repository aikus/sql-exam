import React, { useState } from 'react';
import * as C from './styles'
import { TextField } from "@mui/material";
import {Button} from "../../components/Button";
import { TextM, TextL, TextS, H2, H5 } from '../../components/Typography'
import {TableToChoose} from "./TableToChoose";
import {ExampleTable} from "./ExampleTable";
import {useNavigate} from "react-router-dom";

export const Practice = () => {
    const navigate = useNavigate();
    const [request, setRequest] = useState('')
    const [chosenTable, setChosenTable] = useState(null)
    const [showResultTable, setShowResultTable] = useState(false)

    const checkRequest = () => {
        // логика проверки запроса
        setShowResultTable(true)
    }

    return (
        <C.Wrapper>
            <C.Link onClick={() => navigate("/react/my-profile")}><TextM>Вернуться к опроснику</TextM></C.Link>
            <C.Header>
                <H2>Задание 1</H2>
                <TextM>Задание 1 из 6</TextM>
            </C.Header>
            <C.Main>
                <C.Task>
                    <C.LeftBlock>
                        <H5>Вопрос:</H5>
                        <C.Question>
                            <TextM>Сделать то, использовать это, сортировать так.</TextM>
                        </C.Question>
                        <TextField
                            margin="normal"
                            id="practice-1"
                            label="Текст запроса"
                            type="text"
                            variant="outlined"
                            multiline={true}
                            fullWidth={true}
                            minRows={5}
                            value={request}
                            onChange={(e) => {
                                setRequest(e.target.value)
                            }}
                        />
                        <C.Description>
                            <TextM>
                                Введите SQL запрос и нажмите "Выполнить запрос", чтобы увидеть результат.
                                Если он верный, то рядом с номером задания появится значок.
                                Чтобы перейти к следующему заданию нажмите "Далее"
                            </TextM>
                        </C.Description>
                        <C.ButtonBox>
                            <Button size={'S'} view={'outlined'}>Назад</Button>
                            <Button size={'S'} view={'outlined'}>Далее</Button>
                            <Button size={'S'} onClick={checkRequest}>Выполнить запрос</Button>
                        </C.ButtonBox>
                    </C.LeftBlock>
                    <C.RightBlock>
                        <TableToChoose setTable={setChosenTable}/>
                    </C.RightBlock>
                </C.Task>
                {chosenTable &&
                    <C.TableWrapper>
                        <TextM>{chosenTable}</TextM>
                        <ExampleTable table={chosenTable}/>
                    </C.TableWrapper>
                }
                {showResultTable &&
                    <C.TableWrapper>
                        <TextM>Результат запроса</TextM>
                        <ExampleTable table={chosenTable}/>
                    </C.TableWrapper>
                }
            </C.Main>
        </C.Wrapper>
    )
}
