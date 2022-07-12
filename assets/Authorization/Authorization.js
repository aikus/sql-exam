import React from 'react';
import * as C from './styles'
import { TextField } from "@mui/material";
import logo from './img/logo.png'

export const Authorization = () => {
    return (
        <C.Wrapper>
            <C.TopBlock>
                <img src={logo} alt="логотип"/>
                <C.Header>Авторизация</C.Header>
            </C.TopBlock>
            <TextField
                autoFocus
                margin="normal"
                id="email"
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
            />
            <TextField
                margin="normal"
                id="outlined-basic-password"
                label="Пароль"
                type="password"
                variant="outlined"
                fullWidth
            />
            <C.ForgotPassword href="#">Не помню пароль</C.ForgotPassword>
            <C.Button>Войти</C.Button>
            <C.RegistrationText>
                <span>Нет учетной записи? </span>
                <a href="#">Зарегистрироваться</a>
            </C.RegistrationText>
        </C.Wrapper>
    )
}

