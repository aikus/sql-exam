import React, {useEffect, useState} from 'react';
import * as C from './styles'
import { TextField, Button, Checkbox, FormControlLabel, FormControl } from "@mui/material";
import { Logo } from "../../components/Logo";
import { useNavigate } from "react-router-dom";
import { H3, H5, TextL, TextS, TextM } from '../../components/Typography'
import {Loader} from "../../components/Loader";
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import {TokenRepository} from '../../Repositories/tokenRepository';
import { Notice } from "../../components/Notice";

export const Authorization = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false)
    const [registration, setRegistration] = useState({
        fio: '',
        email: '',
        password: '',
        repeatPassword: '',
        agreeTerms: true,
    });
    const [formType, setFormType] = useState('authorization')
    const [state, setState] = useState({
        emailValue: '',
        emailError: false,
        emailErrorText: 'Вы ввели неверный email',
        passwordValue: '',
        passwordError: false,
        passwordErrorText: 'Неверный формат пароля',
        headerText: 'Авторизация',
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

            TokenRepository.get(state.emailValue, state.passwordValue,
              (data) => {
                    setLoader(false);
                    setState((prevState) => {
                      return { ...prevState, passwordError: false }
                    })
                    localStorage.setItem('jwtToken', data.token)
                    navigate("/react/my-profile");
                },
              (error) => {
                setLoader(false);
                if (error.status === 401) {
                    setState((prevState) => {
                        return {
                            ...prevState,
                            passwordError: true,
                            passwordErrorText: error.body.message,
                        }
                    })
                }
              }
            );
        }
    }

    const handleRegistrationSubmit = (e) => {
      e.preventDefault()

      setLoader(true)

      TokenRepository.create({
          email: registration.email,
          agreeTerms: registration.agreeTerms,
          fio: registration.fio,
          plainPassword: {
              first: registration.password,
              second: registration.repeatPassword,
          },
        },
        (data) => {
          setLoader(false);
          if (data.status === 'success') {
            setState((prevState) => {
              return {
                ...prevState,
                registered: true,
                error: null
              }
            })
            setTimeout(() => {
              handleBack();
            }, 1500)
          }
        },
        (error) => {
          setLoader(false);
          setState((prevState) => {
            return {
              ...prevState,
              error: error
            }
          })
        }
      )
    }

    const handleRestorePasswordSubmit = (e) => {
        e.preventDefault()
        setLoader(true)

        TokenRepository.change(state.emailRestoreValue,
          (data) => {
              setLoader(false)
              if (data?.status === 'ok') {
                  setState((prevState) => {
                      return {
                          ...prevState,
                          emailSentMessage: data.message,
                          restoreSuccessfully: true,
                          headerText: ''
                      }
                  })
              }
          },
          (error) => {
              setLoader(false)
              if (error?.status === 'error') {
                  setState((prevState) => {
                      return {
                          ...prevState,
                          emailRestoreError: true,
                          emailRestoreErrorText: data.errors[0]
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

    const handleRegistrationField = (e, fieldName) => {
        setRegistration((prevState) => {
            return { ...prevState, [fieldName]: e.target.value }
        })
    }

    const handleForgotPassword = () => {
        setFormType('restorePassword')
        setState((prevState) => {
            return {
                ...prevState,
                headerText: state.restoreSuccessfully ? '' : 'Введите ваш Email что бы сбросить пароль'
            }
        })
    }

    const handleRegistration = () => {
        setFormType('registration');
        setState((prevState) => {
            return {
                ...prevState,
                headerText: 'Регистрация'
            }
        })
    }

    const handleBack = () => {
        setFormType('authorization')
        setState((prevState) => {
            return {
                ...prevState,
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
                        <Button
                          variant='contained'
                          size='large'
                          type="submit"
                        >Войти</Button>
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
                {null !== state.error ? <Notice message={state.error}/> : ''}
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
                        onChange={(e) => handleRegistrationField(e, 'fio')}
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
                        onChange={(e) => handleRegistrationField(e, 'email')}
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
                        onChange={(e) => handleRegistrationField(e, 'password')}
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
                        onChange={(e) => handleRegistrationField(e, 'repeatPassword')}
                      />
                      <FormControlLabel control={
                          <Checkbox
                              id="agreeTerms"
                              defaultChecked
                              onChange={(e) => {
                                  setRegistration((prevState) => {
                                      return { ...prevState, agreeTerms: e.target.checked }
                                  })
                              }}
                          />
                      } label="Согласен с политикой конфиденциальности" />

                      <FormControl sx={{width: '100%'}}>
                        <Button
                          variant='contained'
                          size='large'
                          type="submit"
                        >
                          Зарегистрироваться
                        </Button>
                      </FormControl>
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
                              <Button
                                variant='contained'
                                size='large'
                                type="submit"
                              >Сбросить пароль</Button>
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
            {{
                registration: renderRegistrationForm,
                authorization: renderAuthorizationForm,
                restorePassword: renderRestorePasswordForm,
            }[formType]()}
            <Loader show={loader}/>
        </C.Wrapper>
    )
}

