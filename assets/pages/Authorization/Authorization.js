import React, {useEffect, useState} from 'react';
import * as C from './styles'
import { TextField } from "@mui/material";
import { Logo } from "../../components/Logo";
import {Button} from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { H3, H5, TextL, TextS, TextM } from '../../components/Typography'
import { hostName } from '../../config'
import {Loader} from "../../components/Loader";
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';

export const Authorization = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false)
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
        emailRestoreValue: '',
        emailRestoreError: false,
        emailRestoreErrorText: 'Неверный формат email',
        restoreSuccessfully: false,
        emailSentMessage: '',
        registered: false,
    })

    const handleAuthorizationSubmit = (e) => {
        e.preventDefault()

        if (state.emailValue && state.passwordValue) {
            setLoader(true)
            fetch(`${hostName}/api/login`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    email: state.emailValue,
                    password: state.passwordValue
                })
            })
                .then(response => response.json())
                .then(data => {
                    setLoader(false)
                    if (data.code === 401) {
                        setState((prevState) => {
                            return {
                                ...prevState,
                                passwordError: true,
                                passwordErrorText: data.message,
                            }
                        })
                    } else {
                        setState((prevState) => {
                            return { ...prevState, passwordError: false }
                        })
                        localStorage.setItem('jwtToken', data.token)
                        navigate("/react/my-profile");
                    }
                })
        }
    }

    const handleRegistrationSubmit = (e) => {
        e.preventDefault()

        if (state.fio && state.emailRegistrationValue && state.passwordRegistration1Value && checkPasswordMatch()) {
            setLoader(true)

            fetch(`${hostName}/api/register`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    email: state.emailRegistrationValue,
                    agreeTerms: 1,
                    fio: state.fio,
                    plainPassword: state.passwordRegistration2Value
                })
            })
                .then(response => response.json())
                .then(data => {
                    setLoader(false);
                    if (data.status === 'success') {
                        setState((prevState) => {
                            return { ...prevState, registered: true }
                        })
                        setTimeout(() => {
                            handleBack();
                        }, 1500)
                    }
                })
        }
    }

    const handleRestorePasswordSubmit = (e) => {
        e.preventDefault()
        setLoader(true)

        fetch(`${hostName}/confirm/password`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "email": state.emailRestoreValue
            })
        })
          .then(response => response.json())
          .then(data => {
              setLoader(false)
              if (data?.status === 'error') {
                  setState((prevState) => {
                      return {
                          ...prevState,
                          emailRestoreError: true,
                          emailRestoreErrorText: data.errors[0]
                      }
                  })
              } else if (data?.status === 'ok') {
                  setState((prevState) => {
                      return {
                          ...prevState,
                          emailSentMessage: data.message,
                          restoreSuccessfully: true,
                          headerText: ''
                      }
                  })
              }
          })
    }

    const handleFieldChange = (e, fieldName) => {
        setState((prevState) => {
            return { ...prevState, [fieldName]: e.target.value }
        })
    }

    const handleForgotPassword = () => {
        setState((prevState) => {
            return {
                ...prevState,
                restorePassword: !prevState.restorePassword,
                headerText: state.restoreSuccessfully ? '' : 'Введите ваш Email что бы сбросить пароль'
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
                return { ...prevState, passwordRegistration2Error: true }
            })

            return false
        } else {
            setState((prevState) => {
                return { ...prevState, passwordRegistration2Error: false }
            })

            return true
        }
    }

    const handleBack = () => {
        setState((prevState) => {
            return {
                ...prevState,
                restorePassword: false,
                registrationBlock: false,
                headerText: 'Авторизация',
                emailRestoreError: false
            }
        })
    }

    useEffect(() => {
        if (localStorage.getItem('jwtToken')) {
            navigate("/react/my-profile");
        }
    }, [])

    const renderAuthorizationForm = () => {
        return (
            <>
                <form noValidate onSubmit={handleAuthorizationSubmit}>
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
                    <C.ButtonBox>
                        <Button type="submit">Войти</Button>
                    </C.ButtonBox>
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
            <>
                {state.registered ?
                  <C.RegisteredSuccessfully>
                      <TaskAltOutlinedIcon fontSize={'large'} sx={{color: 'green'}}/>
                      <H5>Вы успешно зарегистрированы :)</H5>
                  </C.RegisteredSuccessfully>
                  :
                  <form noValidate onSubmit={handleRegistrationSubmit}>
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
                      <C.ButtonReg>
                          <Button type="submit">Зарегистрироваться</Button>
                      </C.ButtonReg>
                  </form>
                }
                <C.Backspace onClick={handleBack}>Назад</C.Backspace>
            </>

        )
    }

    const renderRestorePasswordForm = () => {
        return (
                <>
                    {state.restoreSuccessfully ?
                      <C.EmailSentBlock>
                          <TaskAltOutlinedIcon fontSize={'large'} sx={{color: 'green'}}/>
                          <H5>{state.emailSentMessage}</H5>
                      </C.EmailSentBlock>
                      :
                      <form noValidate onSubmit={handleRestorePasswordSubmit}>
                          <TextField
                            autoFocus
                            margin="normal"
                            id="restorePassword"
                            label="Email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            error={state.emailRestoreError}
                            helperText={state.emailRestoreError ? state.emailRestoreErrorText : ''}
                            value={state.emailRestoreValue}
                            onChange={(e) => handleFieldChange(e, 'emailRestoreValue')}
                          />
                          <C.ButtonBox>
                              <Button type="submit">Сбросить пароль</Button>
                          </C.ButtonBox>
                      </form>
                    }
                    <C.Backspace onClick={handleBack}>Назад</C.Backspace>
                </>
            )
    }

    return (
        <C.Wrapper>
            <C.TopBlock>
                <Logo/>
                <C.Header><H3>{state.headerText}</H3></C.Header>
            </C.TopBlock>
            {state.restorePassword && renderRestorePasswordForm()}
            {!state.restorePassword && !state.registrationBlock && renderAuthorizationForm()}
            {state.registrationBlock && renderRegistrationForm()}
            <Loader show={loader}/>
        </C.Wrapper>
    )
}

