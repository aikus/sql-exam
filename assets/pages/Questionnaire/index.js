import React, { useState, useEffect } from 'react';
import * as C from './styles'
import {Button} from "../../components/Button";
import { TextM, TextL, TextS, H2, H3 } from '../../components/Typography'
import {useNavigate} from "react-router-dom";
import {SkillTable} from './SkillTable'

export const Questionnaire = () => {

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
                <SkillTable/>
            </C.Main>
        </C.Wrapper>
    )
}

