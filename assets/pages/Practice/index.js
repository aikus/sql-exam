import React, {useEffect, useState} from 'react';
import * as C from './styles'
import { Box, Button, ButtonGroup, Grid, Paper, Typography } from "@mui/material";
import { H5, TextS } from '/assets/components/Typography'
import { TableToChoose } from "/assets/pages/Practice/TableToChoose";
import { ExampleTable } from "/assets/pages/Practice/ExampleTable";
import { ResultBlock } from "/assets/pages/Practice/ResultBlock";
import { useNavigate } from "react-router-dom";
import { HttpRequest } from "/assets/Service/HttpRequest";
import { Loader } from "/assets/components/Loader";
import { UrlService } from "/assets/Service/UrlService";
import { StudentTableData } from "/assets/Service/StudentTableData";
import { Notice } from "/assets/components/Notice";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { sanitizer } from "/assets/Service/Sanitizer";
import { SqlAnswer } from "/assets/pages/Practice/Component/SqlAnswer";
import { PollAnswer } from "/assets/pages/Practice/Component/PollAnswer";
import { BackToMainPageButton } from "/assets/components/Main/Button/BackToMainPageButton";
import { Title } from "/assets/components/Main/Typography/Title";

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

    const urlContainer = (key, id) => {
        const container = {
            processStart: `/api-process/${id}/start`,
            processAnswer: `/api-process/${id}/answer`,
            processExecution: `/api-process/${id}/execution`,
            processFinish: `/api-process/${id}/finish`,
            processPreviousStep: `/api-process/${id}/previous-step`,
        };

        if (null === id) {
            throw Error(`Не удалось сделать запрос '${container[key]}'. Отсутствует 'id'`);
        }
        return container[key];
    }

    const start = () => {
        let course = UrlService.param('course');
        HttpRequest.get(
            urlContainer('processStart', course),
            data => {
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
                    type: data.type,
                    pollOptions: data.pollOptions,
                    settings: data.settings
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
                if (typeof callBack === 'function') {
                    callBack();
                }
                getElement(data)
            },
            error => {
                setError(error)
                setLoader(false)
            }
        )
    };

    const handlePollAnswer = (selectedOption) => {
        setLoader(true)
        HttpRequest.post(
            urlContainer('processExecution', UrlService.param('course')),
            {
                answerText: JSON.stringify(selectedOption),
            },
            data => {
                setProcessState(data)
                setError(false)
                getElement(data)
            },
            error => {
                setError(error)
                setLoader(false)
            }
        )
    }

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
                setSqlResponse((data.sqlResponse?.length > 0) ? data?.sqlResponse : null)
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
        } else {
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
        } else {
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
        return process?.elements.indexOf(process.currentElement);
    }

    const answerableTypes = {
            mysql: true,
            postgres: true,
            sql: true,
            oracle: true,
            'open-question': true
        },
        executeLabel = "Принять ответ",
        fieldLabel = "Введите текст запроса",
        buttonLabels = {
            mysql: executeLabel,
            postgres: executeLabel,
            sql: executeLabel,
            oracle: executeLabel,
            'open-question': executeLabel
        },
        answerFieldLabels = {
            mysql: fieldLabel,
            postgres: fieldLabel,
            oracle: fieldLabel,
            sql: fieldLabel,
            'open-question': "Ваш ответ"
        },
        isAnswerable = () => {
            return answerableTypes[element.type] || false;
        },
        buttonLabel = () => {
            return buttonLabels[element.type] || "";
        },
        answerFieldLabel = () => {
            return answerFieldLabels[element.type] || ""
        },
        showRequestResult = (sqlResponse) => {
            return ('open-question' === element.type) ? <C.Block>
                    <ResultBlock data={"Ответ сохранён"}/>
                </C.Block> :
                <C.Block>
                    <ResultBlock data={sqlResponse}/>
                </C.Block>
        };

    const finishButton = () => {
        return !isExistNextStep
        && <Button
            variant='contained'
            size='medium'
            onClick={() => {
                handleFinish(() =>
                    navigate(`/react/my-profile/course-result?course=${UrlService.param('course')}`));
            }}
        >
            Завершить
        </Button>
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

    return <Box>
      <Notice message={error}/>
      <Loader show={loader}/>
      <Box sx={{mt: '2rem', mb: 3}}>
        <BackToMainPageButton />
      </Box>
      <Grid container justifyContent="space-between" sx={{mt: 3, mb: 4}}>
        <Grid item>
          <Title>{element.name}</Title>
        </Grid>
        <Grid item alignSelf={'center'}>
          <Typography variant={"body1"}>Задание {element.ord} из {processState.elementCount}</Typography>
        </Grid>
      </Grid>
      <Paper sx={{p: 3}}>
        <Grid container justifyContent={'space-between'}>
          <Grid item>
            <ButtonGroup>
              <div>
                <Button
                    size='S'
                    variant={'outlined'}
                    onClick={handlePrevStep}
                    color="secondary"
                    disabled={!isExistPrevStep}
                    startIcon={<KeyboardArrowLeftIcon />}
                >
                  Назад
                </Button>
                <Button
                    size='S'
                    variant={'outlined'}
                    onClick={handleNextStep}
                    color="secondary"
                    disabled={!isExistNextStep} endIcon={<KeyboardArrowRightIcon />}
                >
                  Далее
                </Button>
              </div>
            </ButtonGroup>
          </Grid>
          <Grid item>
          {timer &&
            <C.Timer onClick={() => setShowTimer(prevState => !prevState)} changeBC={redBorder}>
              {showTimer
                ? <>
                  <H5>Осталось {Math.trunc(timer / 60)} мин {timer % 60} сек</H5>
                  <TextS>По истечении времени прохождение будет завершено</TextS>
                </>
                : <C.ClosedTimer>
                  <TimerOutlinedIcon fontSize={'large'} sx={{color: redBorder ? '#ED1C24' : 'none'}}/>
                  <Typography>Осталось {redBorder && 'мало'} времени...</Typography>
                </C.ClosedTimer>
              }
            </C.Timer>
          }
          </Grid>
        </Grid>
        <Grid container justifyContent="space-between" spacing={0} sx={{mt: 4}}>
          <Grid item xs={12} md={isAnswerable() ? 8 : 12}>
            { null !== element.type && element.type !== 'article' && <H5>Вопрос:</H5> }
            <Box>
              <Typography dangerouslySetInnerHTML={{__html: sanitizer(element.description)}} />
            </Box>
            {
              isAnswerable()
              && <SqlAnswer answer={answer} setAnswer={setAnswer} handleExecution={handleExecution} finishButton={finishButton()} />
            }
            {
              element.type === 'poll' && <PollAnswer element={element} handlePollAnswer={handlePollAnswer} />
            }
          </Grid>
          {
            isAnswerable()
            && <Grid item xs={12} md={4}>
              <TableToChoose tableData={givenTables} setChosenTable={setChosenTable}/>
            </Grid>
          }
        </Grid>
        {
          !isAnswerable()
          && <Box sx={{mt: 4}}>
            {finishButton()}
          </Box>
        }
        {
          null !== sqlResponse &&
          <Box sx={{mt: 4}}>
            <ResultBlock data={sqlResponse}/>
          </Box>
        }
        {
          null !== chosenTable &&
          <Box sx={{mt: 4}}>
            <Typography>{chosenTable}</Typography>
            <ExampleTable tableData={givenTablesData[chosenTable]}/>
          </Box>
        }
      </Paper>
    </Box>
}
