import React, { useState } from 'react';
import * as C from './styles'
import { TextField } from "@mui/material";
import logo from './img/logo.png'

export const Authorization = () => {
    const [state, setState] = useState({
        emailValue: '',
        emailError: false,
        emailErrorText: 'Вы ввели неверный email',
        passwordValue: '',
        passwordError: false,
        passwordErrorText: 'Неверный формат пароля',
        restorePassword: false,
        registrationBlock: false,
        headerText: 'Авторизация',
        fio: '',
        fioError: false,
        fioErrorText: 'Укажите ФИО полностью',
        emailRegistrationValue: '',
        emailRegistrationError: false,
        emailRegistrationErrorText: 'Вы ввели неверный email',
        passwordRegistration1Value: '',
        passwordRegistration1Error: false,
        passwordRegistration1ErrorText: 'Неверный формат пароля',
        passwordRegistration2Value: '',
        passwordRegistration2Error: false,
        passwordRegistration2ErrorText: 'Пароль не совпадает с введенным ранее',
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

    const handleRegistration = () => {
        setState((prevState) => {
            return {
                ...prevState,
                registrationBlock: !prevState.registrationBlock,
                headerText: 'Регистрация'
            }
        })
    }

    const checkPasswordMatch = () => {
        if (state.passwordRegistration1Value !== state.passwordRegistration2Value) {
            setState((prevState) => {
                return {
                    ...prevState,
                    passwordRegistration2Error: true
                }
            })
        } else {
            setState((prevState) => {
                return {
                    ...prevState,
                    passwordRegistration2Error: false
                }
            })
        }
    }

    const handleRestorePassword = () => {

    }

    const handleBack = () => {
        setState((prevState) => {
            return {
                ...prevState,
                restorePassword: false,
                registrationBlock: false,
                headerText: 'Авторизация'
            }
        })
    }

    const renderAuthorizationForm = () => {
        return (
            <>
                <form noValidate onSubmit={handleSubmit}>
                    <TextField
                        autoFocus
                        margin="normal"
                        id="email-auth"
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
                        id="password-auth"
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
                <C.RegistrationText>
                    <span>Нет учетной записи? </span>
                    <C.RegistrationLink onClick={handleRegistration}>Зарегистрироваться</C.RegistrationLink>
                </C.RegistrationText>
            </>
        )
    }

    const renderRegistrationForm = () => {
        return (
            <form noValidate onSubmit={handleSubmit}>
                <TextField
                    autoFocus
                    margin="normal"
                    id="fio-reg"
                    label="ФИО"
                    type="text"
                    variant="outlined"
                    fullWidth
                    error={state.fioError}
                    helperText={state.fioError ? state.fioErrorText : ''}
                    value={state.fio}
                    onChange={(e) => handleFieldChange(e, 'fio')}
                />
                <TextField
                    margin="normal"
                    id="email-reg"
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    error={state.emailRegistrationError}
                    helperText={state.emailRegistrationError ? state.emailRegistrationErrorText : ''}
                    value={state.emailRegistrationValue}
                    onChange={(e) => handleFieldChange(e, 'emailRegistrationValue')}
                />
                <TextField
                    margin="normal"
                    id="password-reg-1"
                    label="Пароль"
                    type="password"
                    variant="outlined"
                    fullWidth
                    error={state.passwordRegistration1Error}
                    helperText={state.passwordRegistration1Error ? state.passwordRegistration1ErrorText : ''}
                    value={state.passwordRegistration1Value}
                    onChange={(e) => handleFieldChange(e, 'passwordRegistration1Value')}
                />
                <TextField
                    margin="normal"
                    id="password-reg-2"
                    label="Повторите пароль"
                    type="password"
                    variant="outlined"
                    fullWidth
                    error={state.passwordRegistration2Error}
                    helperText={state.passwordRegistration2Error ? state.passwordRegistration2ErrorText : ''}
                    value={state.passwordRegistration2Value}
                    onChange={(e) => handleFieldChange(e, 'passwordRegistration2Value')}
                    onBlur={checkPasswordMatch}
                />
                <C.ButtonReg type="submit">Зарегистрироваться</C.ButtonReg>
                <C.Backspace onClick={handleBack}>Назад</C.Backspace>
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
                <C.Header>{state.headerText}</C.Header>
            </C.TopBlock>
            {state.restorePassword && renderRestorePasswordForm()}
            {!state.restorePassword && !state.registrationBlock && renderAuthorizationForm()}
            {state.registrationBlock && renderRegistrationForm()}
        </C.Wrapper>
    )
}

