import React, { useState } from 'react';
import * as C from './styles'
import { Menu, MenuItem } from "@mui/material";

export const MyProfile = () => {


    return (
        <>
            <h1>Мой профиль</h1>
            <C.MyProfileBox>
                <C.MyProfile>
                    <C.Text>
                        <p>Привет, username</p>
                        <p>Добро пожаловать в твой личный кабинет в специальном образовательном ресурсе Scirpus.</p>
                        <p>Здесь ты можешь посмотреть свой рейтинг и курсы</p>
                    </C.Text>
                    <C.ButtonBox>
                        <C.Button>Посмотреть другие курсы</C.Button>
                        <C.Button>Посмотреть свою подробную статистику</C.Button>
                    </C.ButtonBox>
                </C.MyProfile>
            </C.MyProfileBox>
        </>
    )
}

