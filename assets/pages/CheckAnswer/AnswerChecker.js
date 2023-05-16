import React from 'react';
import * as C from './styles'
import {
    Button, ButtonGroup, Checkbox,
    FormControlLabel, ToggleButton, ToggleButtonGroup
} from "@mui/material";
import {H3, H5} from '../../components/Typography';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

export const AnswerChecker = ({answer, answerPatch, hasNext, hasPrev, toNext, toPrev}) => {
    const question = answer.question,
        getValueString = () => answer.isRight ? "right" : "wrong";
    return (
        <>
            <C.MovementButtons>
                <ButtonGroup>
                    <Button
                        size='medium'
                        variant='outlined'
                        onClick={toPrev}
                        color="secondary"
                        startIcon={<ChevronLeftRoundedIcon/>}
                        disabled={!hasPrev}
                    >
                        Назад
                    </Button>
                    <Button
                        size='medium'
                        variant='outlined'
                        onClick={toNext}
                        color="secondary"
                        disabled={!hasNext}
                        endIcon={<ChevronRightRoundedIcon/>}
                    >
                        Далее
                    </Button>
                </ButtonGroup>
            </C.MovementButtons>
            <C.HeaderBlock>
                <H3>Вопрос:</H3>
                <div>{question.name}</div>
            </C.HeaderBlock>
            <C.QuestionBlock>
                <H3>Текст вопроса:</H3>
                <div>{question.description}</div>
            </C.QuestionBlock>
            <C.QuestionBlock>
                <H3>Правильный вартиант ответа:</H3>
                <div>{question.answer}</div>
            </C.QuestionBlock>
            <C.QuestionBlock>
                <H3>Ответ студента:</H3>
                <div>{answer.answer}</div>
            </C.QuestionBlock>
            <C.QuestionBlock>
                <H3>Результат проверки:</H3>
                <ToggleButtonGroup
                    value={getValueString()}
                    exclusive
                    onChange={(event, value) => {
                        if(!value) {
                            return;
                        }
                        answer.isRight = "right" === value;
                        answerPatch(answer);
                    }}
                >
                    <ToggleButton value="right"><CheckIcon color={"success"}/> Ответ верный</ToggleButton>
                    <ToggleButton value="wrong"><CloseIcon color={"error"}/> Ответ ошибочый</ToggleButton>
                </ToggleButtonGroup>
            </C.QuestionBlock>
        </>
    )
};