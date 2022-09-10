import React, { useState } from 'react';
import * as C from './styles'
import {Button} from "../../../components/Button";
import { H2, TextL } from '../../../components/Typography'

export const MyProfile = () => {

    return (
        <>
            <H2>Мой профиль</H2>
            <C.MyProfileBox>
                <C.MyProfile>
                    <C.Text>
                        <TextL>Привет, username</TextL>
                        <TextL>Добро пожаловать в твой личный кабинет в специальном образовательном ресурсе Scirpus.</TextL>
                        <TextL>Здесь ты можешь посмотреть свой рейтинг и курсы</TextL>
                    </C.Text>
                    <C.ButtonBox>
                        <Button>Посмотреть другие курсы</Button>
                        <Button>Посмотреть свою подробную статистику</Button>
                    </C.ButtonBox>
                </C.MyProfile>
            </C.MyProfileBox>
        </>
    )
}

