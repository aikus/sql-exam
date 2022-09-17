import React, { useState } from 'react';
import * as C from './styles'
import { TextField } from "@mui/material";
import {Button} from "../../components/Button";
import { TextM, TextL, TextS, H2, H5 } from '../../components/Typography'
import {TableToChoose} from "./TableToChoose";

export const Practice = () => {
    const [state, setState] = useState({
        answerFieldValue: null,
    })


    const columns = [
        { field: "id", headerName: "ID", width: 0 },
        { field: 'tableName', headerName: 'Название таблицы', width: 70 },
        { field: 'numOfLines', headerName: 'Кол-во строк', width: 130 },
    ];

    const rows = [
        { id: 1, tableName: 'Таблица 1', headerName: 40 },
        { id: 2, tableName: 'Таблица 2', headerName: 38 },
        { id: 3, tableName: 'Таблица 3', headerName: 41 },
        { id: 4, tableName: 'Таблица 4', headerName: 14 },
    ];

    return (
        <C.Wrapper>
            <C.Link><TextM>Вернуться к опроснику</TextM></C.Link>
            <C.Header>
                <H2>Задание 1</H2>
                <TextM>Задание 1 из 6</TextM>
            </C.Header>
            <C.Main>
                {/*<C.LeftBlock>*/}
                {/*    <H5>Вопрос:</H5>*/}
                {/*    <C.Question>*/}
                {/*        <TextM>Сделать то, использовать это, сортировать так.</TextM>*/}
                {/*    </C.Question>*/}
                {/*    <TextField*/}
                {/*        margin="normal"*/}
                {/*        id="practice-1"*/}
                {/*        label="Текст запроса"*/}
                {/*        type="text"*/}
                {/*        variant="outlined"*/}
                {/*        multiline={true}*/}
                {/*        fullWidth={true}*/}
                {/*        minRows={5}*/}
                {/*        value={state.answerFieldValue}*/}
                {/*        onChange={(e) => {*/}
                {/*            setState({...state, answerFieldValue: e.target.value})*/}
                {/*        }}*/}
                {/*    />*/}
                {/*    <C.Description>*/}
                {/*        <TextM>*/}
                {/*            Введите SQL запрос и нажмите "Выполнить запрос", чтобы увидеть результат.*/}
                {/*            Если он верный, то рядом с номером задания появится значок.*/}
                {/*            Чтобы перейти к следующему заданию нажмите "Далее"*/}
                {/*        </TextM>*/}
                {/*    </C.Description>*/}
                {/*    <C.ButtonBox>*/}
                {/*        <Button type={'outlined'}>Назад</Button>*/}
                {/*        <Button type={'outlined'}>Выполнить запрос</Button>*/}
                {/*        <Button type={'outlined'}>Далее</Button>*/}
                {/*    </C.ButtonBox>*/}
                {/*</C.LeftBlock>*/}
                <C.RightBlock>
                    <TableToChoose/>
                </C.RightBlock>
            </C.Main>
        </C.Wrapper>
    )
}

