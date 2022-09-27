import React, { useState, useEffect } from 'react';
import * as C from './styles'
import {Button} from "../../components/Button";
import { TextM, TextL, TextS, H2, H3 } from '../../components/Typography'
import {useNavigate} from "react-router-dom";
import {SkillTable} from './SkillTable'
import {ArtefactTable} from './ArtefactTable'

const initFormData = () => {
    let accumulator = {}

    for (let i = 0; i < data.length; i++) {
        accumulator[i] = {type: '', link: ''}
    }

    return accumulator
}

export const Questionnaire = () => {
    const [formData, setFormData] = useState(initFormData)

    const checkPracticeExistence = () => {
        for (let key in formData) {
            if (formData[key].type === 'практика') {
                return true
            }
        }
        return false
    }


    return (
        <C.Wrapper>
            <C.Header>
                <H2>Опросник PR 3Q2022</H2>
                <TextM>Опросник доступен для редактирования до DD.MM.YYYY</TextM>
            </C.Header>
            <C.Main>
                <H3>Детализация</H3>
                <TextM>
                    В таблице ниже вам необходимо выбрать скиллы, которые вы будете защищать
                    в предстоящих performance review. В столбце "тип сдачи" выберите формат.
                </TextM>
                <SkillTable
                    rawData={data}
                    typeData={formData}
                    setType={setFormData}
                />
                {checkPracticeExistence() &&
                    <C.ArtefactBlock>
                        <C.TextBlock>
                            <H3>Артефакты</H3>
                            <TextM>
                                В таблице приведены скиллы, которые вы пометили к сдаче на практике.
                                Приложите к каждому скиллу не менее двух ссылок на  артефакты, подтверждающие ваше владение скиллом.
                            </TextM>
                            <ArtefactTable
                                rawData={data}
                                tableData={formData}
                                setLinks={setFormData}
                            />
                        </C.TextBlock>
                    </C.ArtefactBlock>
                }
            </C.Main>
        </C.Wrapper>
    )
}

const data = [
    {'skill': 'BPMN 2.0', 'description': 'тут текст с описанием', 'skill_group': 'построение диаграмм/схем', 'done': '', 'belonging': 'Общий'},
    {'skill': 'API', 'description': 'тут текст с описанием', 'skill_group': 'построение диаграмм/схем', 'done': '', 'belonging': 'Общий'},
    {'skill': 'Камунда', 'description': 'тут текст с описанием', 'skill_group': 'построение диаграмм/схем', 'done': 'теория', 'belonging': 'Общий'},
    {'skill': 'BPMN 2.0', 'description': 'тут текст с описанием', 'skill_group': 'построение диаграмм/схем', 'done': 'практика', 'belonging': 'Общий'},
    {'skill': 'BPMN 2.0', 'description': 'тут текст с описанием', 'skill_group': 'построение диаграмм/схем', 'done': '', 'belonging': 'Общий'},
    {'skill': 'BPMN 2.0', 'description': 'тут текст с описанием', 'skill_group': 'построение диаграмм/схем', 'done': '', 'belonging': 'Общий'},
]

