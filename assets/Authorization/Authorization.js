import React, { useState } from 'react';
import * as C from './styles'
import { TextField } from "@mui/material";
import logo from './img/logo.png'

export const Authorization = () => {
    const [state, setState] = useState({
        emailError: false,
        emailErrorText: 'Вы ввели неверный email',
        passwordError: false,
        passwordErrorText: 'Вы ввели неверный пароль',
        emailValue: '',
        passwordValue: '',
        restorePassword: false,
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        // отправка значений на бэк
    }

    const handleFieldChange = (e, fieldName) => {
        setState((prevState) => {
            return {
                ...prevState,
                [fieldName]: e.target.value
            }
        })
    }

    const handleForgotPassword = () => {
        setState((prevState) => {
            return {
                ...prevState,
                restorePassword: !prevState.restorePassword
            }
        })
    }

    const handleRestorePassword = () => {

    }

    const renderAuthorizationForm = () => {
        return (
            <form noValidate onSubmit={handleSubmit}>
                <TextField
                    autoFocus
                    margin="normal"
                    id="email"
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    error={state.emailError}
                    helperText={state.emailError ? state.emailErrorText : ''}
                    value={state.emailValue}
                    onChange={(e) => handleFieldChange(e, 'emailValue')}
                />
                <TextField
                    margin="normal"
                    id="outlined-basic-password"
                    label="Пароль"
                    type="password"
                    variant="outlined"
                    fullWidth
                    error={state.passwordError}
                    helperText={state.passwordError ? state.passwordErrorText : ''}
                    value={state.passwordValue}
                    onChange={(e) => handleFieldChange(e, 'passwordValue')}
                />
                <C.ForgotPassword onClick={handleForgotPassword}>Не помню пароль</C.ForgotPassword>
                <C.Button type="submit">Войти</C.Button>
            </form>
        )
    }

    const renderRestorePasswordForm = () => {
        return (
                <>
                    <form noValidate onSubmit={handleRestorePassword}>
                        <TextField
                            margin="normal"
                            id="restorePassword"
                            label="Email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            error={state.emailError}
                            helperText={state.emailError ? state.emailErrorText : ''}
                            value={state.emailValue}
                            onChange={(e) => handleFieldChange(e, 'emailValue')}
                        />
                        <C.Button type="submit">Войти</C.Button>
                    </form>
                    <C.Button>Назад</C.Button>
                </>
            )
    }

    return (
        <C.Wrapper>
            <C.TopBlock>
                <img src={logo} alt="логотип"/>
                <C.Header>Авторизация</C.Header>
            </C.TopBlock>
            {state.restorePassword && renderRestorePasswordForm()}
            {!state.restorePassword && renderAuthorizationForm()}
            <C.RegistrationText>
                <span>Нет учетной записи? </span>
                <a href="#">Зарегистрироваться</a>
            </C.RegistrationText>
        </C.Wrapper>
    )
}

