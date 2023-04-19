import React, {useEffect, useRef, useState} from 'react';
import * as C from './styles'
import { Button, ButtonGroup, Link, TextField } from "@mui/material";
import { H2, H5, TextL, TextM, TextS } from '../../components/Typography'
import { TableToChoose } from "./TableToChoose";
import { ExampleTable } from "./ExampleTable";
import { ResultBlock } from "./ResultBlock";
import { useNavigate } from "react-router-dom";
import { HttpRequest } from "../../Service/HttpRequest";
import { Loader } from "../../components/Loader";
import { UrlService } from "../../Service/UrlService";
import { StudentTableData } from "../../Service/StudentTableData";
import { Notice } from "../../components/Notice";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import {sanitizer} from "../../Service/Sanitizer";
import {SyntaxHighlightingField} from "../../components/SyntaxHighlightingField";

export const Practice = () => {
    const navigate = useNavigate();
    const [element, setElement] = useState({
        name: null,
        description: null,
        ord: null,
        type: null
    })
    const [processState, setProcessState] = useState({
        state: '',
        elementCount: 0,
        elements: [],
        currentElement: '',
        sqlRequest: null,
        sqlResponse: null
    })
    const [isExistNextStep, setIsExistNextStep] = useState(false)
    const [isExistPrevStep, setIsExistPrevStep] = useState(false)
    const [answer, setAnswer] = useState(null)
    const [chosenTable, setChosenTable] = useState(null)
    const [sqlResponse, setSqlResponse] = useState(null)
    const [givenTables, setGivenTables] = useState([])
    const [givenTablesData, setGivenTablesData] = useState(null)
    const [loader, setLoader] = useState(true)
    const [error, setError] = useState(false)
    const [timer, setTimer] = useState(null);
    const [showTimer, setShowTimer] = useState(false);
    const [redBorder, setRedBorder] = useState(false);
    const inputEl = useRef(null);

    const urlContainer = (key, id) => {
        if (null === id) {
            throw Error(`Не удалось сделать запрос '${container[key]}'. Отсутствует 'id'`);
        }

        let container = {
            processStart: `/api-process/${id}/start`,
            processAnswer: `/api-process/${id}/answer`,
            processExecution: `/api-process/${id}/execution`,
            processFinish: `/api-process/${id}/finish`,
            processPreviousStep: `/api-process/${id}/previous-step`,
        };
        return container[key];
    }

    const start = () => {
        let course = UrlService.param('course');
        HttpRequest.get(
            urlContainer('processStart', course),
            data => {
                console.info('start data', data);
                setProcessState(data)
                setAnswer(data.sqlRequest)
                setError(false)
                getElement(data)
                setTimer(data?.secondsTimeLeft);
                if (data?.secondsTimeLeft !== null) {
                    startTimer();
                }
            },
            error => {
                setError(error)
                setLoader(false)
            }
        );
    }

    const startTimer = () => {
        let timerId = setInterval(() => {
            setTimer((prevState) => {
                if (prevState === 5 * 60) {
                    setRedBorder(true);
                }
                if (prevState <= 1) {
                    clearInterval(timerId);
                    handleFinish(() => navigate(`/react/my-profile/course-result?course=${UrlService.param('course')}`));
                }
                return prevState - 1;
            });
        }, 1000);
    }

    const getElement = process => {
        if (
            null === process.currentElement
            || undefined === process.currentElement
        ) {
            setError({
                status: 400,
                statusText: 'Bad Request',
                body: {message: 'Курс завершён'},
            })
            setLoader(false)
            return;
        }
        HttpRequest.get(
            process.currentElement,
            data => {
                setElement({
                    name: data.name,
                    description: data.description,
                    ord: data.ord,
                    type: data.type
                })
                checkNavState(process)
                setError(false)
                setLoader(false)
            },
            error => {
                checkNavState(process)
                setError(error)
                setLoader(false)
            }
        )
    }

    const handleExecution = callBack => {
        setLoader(true)
        HttpRequest.post(
            urlContainer('processExecution', UrlService.param('course')),
            {
                answerText: answer,
            },
            data => {
                setProcessState(data)
                setAnswer(data.sqlRequest)
                setSqlResponse(data.sqlResponse)
                setError(false)
                if (typeof callBack === 'function') callBack()
                getElement(data)
            },
            error => {
                setError(error)
                setLoader(false)
            }
        )
    };

    const handleFinish = callBack => {
        setLoader(true)
        HttpRequest.post(
            urlContainer('processFinish', UrlService.param('course')),
            {
                answerText: answer,
            },
            data => {
                setProcessState(data)
                setAnswer(data.sqlRequest)
                setSqlResponse(data.sqlResponse)
                setError(false)
                if (typeof callBack === 'function') callBack()
                getElement(data)
            },
            error => {
                setError(error)
                setLoader(false)
            }
        )
    }

    const sendAnswer = () => {
        HttpRequest.post(
            urlContainer('processAnswer', UrlService.param('course')),
            {
                answerText: answer,
            },
            data => {
                setProcessState(data)
                setError(false)
                setAnswer(data.sqlRequest ?? '')
                setSqlResponse(null)
            },
            error => {
                setError(error)
                setLoader(false)
            }
        )
    }

    const sendPrevStep = () => {
        HttpRequest.get(
            urlContainer('processPreviousStep', UrlService.param('course')),
            data => {
                setProcessState(data)
                setError(false)
                setAnswer(data.sqlRequest ?? '')
                setSqlResponse(data.sqlResponse.length > 0 ? data.sqlResponse : null)
            },
            error => {
                setError(error)
                setLoader(false)
            }
        )
    }

    const handleNextStep = () => {
        setLoader(true)
        setAnswer('')
        setSqlResponse(null)
        let nextIndex = nextStepIndex(processState);
        if (nextIndex === -1) {
            setError({
                status: 400,
                statusText: 'Bad Request',
                body: {message: 'Не найден шаг следующий за ' + element.name},
            })
        }
        else {
            sendAnswer()
            processState.currentElement = processState.elements[nextIndex]
            getElement(processState)
        }
    }

    const handlePrevStep = () => {
        setLoader(true)
        let prevIndex = prevStepIndex(processState);
        if (prevIndex === -1) {
            setError({
                status: 400,
                statusText: 'Bad Request',
                body: {message: 'Не найден шаг перед ' + element.name},
            })
        }
        else {
            sendPrevStep()
            processState.currentElement = processState.elements[prevIndex]
            getElement(processState)
        }
    }

    const checkNavState = process => {
        setIsExistNextStep(process.elements[nextStepIndex(process)] !== undefined)
        setIsExistPrevStep(process.elements[prevStepIndex(process)] !== undefined)
    }

    const prevStepIndex = process => {
        return currentStepIndex(process) - 1;
    }

    const nextStepIndex = process => {
        return currentStepIndex(process) + 1;
    }

    const currentStepIndex = process => {
        console.info('currentStepIndex process:', JSON.parse(JSON.stringify(process)))
        return process?.elements.indexOf(process.currentElement);
    }

    const isAnswerable = () => {
        return element.type === 'mysql' || element.type === 'postgres' || element.type === 'oracle';
    }

    useEffect(() => {
        start()
        StudentTableData(data => {
            let dataTableArr = []
            for (let key in data) {
                dataTableArr.push({
                    tableName: [key],
                    linesNum: data[key].count
                })
            }
            setGivenTables(dataTableArr)
            setGivenTablesData(data)
        })
    }, [])

    return (
        <C.Wrapper>
            <Notice message={error}/>
            <Loader show={loader}/>

            <Button onClick={() => navigate("/react/my-profile")} variant={'text'} color='info' size='S'
                    startIcon={<KeyboardArrowLeftIcon />}>
                Вернуться к опроснику
            </Button>
            <C.Header>
                <H2>{element.name}</H2>
                <TextL>Задание {element.ord} из {processState.elementCount}</TextL>
            </C.Header>
            <C.Main>
                <C.TopBlock>
                    <ButtonGroup>
                        <div>
                            <Button size='S' variant={'outlined'} onClick={handlePrevStep} color="secondary"
                                    disabled={!isExistPrevStep} startIcon={<KeyboardArrowLeftIcon />}
                            >
                                Назад
                            </Button>
                            <Button size='S' variant={'outlined'} onClick={handleNextStep} color="secondary"
                                    disabled={!isExistNextStep} endIcon={<KeyboardArrowRightIcon />}
                            >
                                Далее
                            </Button>
                        </div>
                    </ButtonGroup>
                    {timer &&
                      <C.Timer onClick={() => setShowTimer(prevState => !prevState)} changeBC={redBorder}>
                          {showTimer ?
                            <>
                                <H5>Осталось {Math.trunc(timer / 60)} мин {timer % 60} сек</H5>
                                <TextS>По истечении времени прохождение будет завершено</TextS>
                            </>
                            :
                            <C.ClosedTimer>
                                <TimerOutlinedIcon fontSize={'large'} sx={{color: redBorder ? '#ED1C24' : 'none'}}/>
                                <TextM>Осталось {redBorder && 'мало'} времени...</TextM>
                            </C.ClosedTimer>
                          }
                      </C.Timer>
                    }
                </C.TopBlock>
                <C.Task>
                    <C.LeftBlock>
                        <H5>Вопрос:</H5>
                        <C.Question>
                            <TextM dangerouslySetInnerHTML={{__html: sanitizer(element.description)}} />
                        </C.Question>
                        {
                            isAnswerable()
                            && <SyntaxHighlightingField
                                elementRef={inputEl}
                                value={answer ?? ''}
                                getValue={(value) => setAnswer(value)}
                            />
                        }
                        {
                            isAnswerable()
                            && <C.Description>
                                <TextM>
                                    Введите SQL запрос и нажмите "Выполнить запрос", чтобы увидеть результат.
                                    Чтобы перейти к следующему заданию нажмите "Далее"
                                </TextM>
                            </C.Description>
                        }
                        <C.ButtonBox>
                            {isAnswerable() &&
                              <div>
                                <Button
                                  variant='contained'
                                  size='medium'
                                  onClick={handleExecution}
                                >
                                    Выполнить запрос
                                </Button>
                              </div>
                            }
                            {!isExistNextStep &&
                              <Button
                                variant='contained'
                                size='medium'
                                onClick={() => {
                                    handleFinish(() => navigate(`/react/my-profile/course-result?course=${UrlService.param('course')}`));
                                }}
                              >
                                    Завершить
                              </Button>
                            }
                        </C.ButtonBox>
                    </C.LeftBlock>
                    <C.RightBlock>
                        <TableToChoose tableData={givenTables} setTable={setChosenTable}/>
                    </C.RightBlock>
                </C.Task>
                {
                    null !== sqlResponse &&
                    <C.Block>
                        <ResultBlock data={sqlResponse}/>
                    </C.Block>
                }
                {
                  chosenTable &&
                  <C.TableWrapper>
                      <TextM>{chosenTable}</TextM>
                      <ExampleTable tableData={givenTablesData[chosenTable]}/>
                  </C.TableWrapper>
                }
            </C.Main>
        </C.Wrapper>
    )
}
