import React, { useEffect, useState } from 'react';
import * as C from './styles'
import { TextField } from "@mui/material";
import { Button } from "../../components/Button";
import { H2, H5, TextL, TextM } from '../../components/Typography'
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
import MuiButton from '@mui/material/Button';
import useStyles from './useStyles'

export const Practice = () => {
    const classes = useStyles();
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

    const urlContainer = (key, id) => {
        if (null === id) {
            throw Error(`Не удалось сделать запрос '${container[key]}'. Отсутствует 'id'`);
        }

        let container = {
            processStart: `/api-process/${id}/start`,
            processAnswer: `/api-process/${id}/answer`,
            processExecution: `/api-process/${id}/execution`,
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
                setError(false)
                getElement(data)
            },
            error => {
                setError(error)
                setLoader(false)
            }
        );
    }

    const getElement = process => {
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
    }

    const handleAnswer = () => {
        setLoader(true)
        HttpRequest.post(
            urlContainer('processAnswer', UrlService.param('course')),
            {
                answerText: answer,
            },
            data => {
                setProcessState(data)
                setError(false)
                setAnswer('')
                setSqlResponse(null)
                getElement(data)
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
        let index = nextStepIndex(processState);
        if (index === -1) {
            throw new Error();
        }
        else {
            processState.currentElement = processState.elements[index]
            getElement(processState)
        }
    }

    const handlePrevStep = () => {
        setLoader(true)
        let index = prevStepIndex(processState);
        if (index === -1) {
            throw new Error();
        }
        else {
            processState.currentElement = processState.elements[index]
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
        console.info('process', process)
        return process?.elements.indexOf(process.currentElement);
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

            <C.Link onClick={() => navigate("/react/my-profile")}><TextM>Вернуться к опроснику</TextM></C.Link>
            <C.Header>
                <H2>{element.name}</H2>
                <TextL>Задание {element.ord} из {processState.elementCount}</TextL>
            </C.Header>
            <C.Main>
                <C.ButtonBox>
                    <div>
                        <MuiButton size='S' variant={'outlined'} onClick={handlePrevStep} color="primary"
                            disabled={!isExistPrevStep} startIcon={<KeyboardArrowLeftIcon />}
                            className={classes.button}
                        >
                            Назад
                        </MuiButton>
                        <MuiButton size='S' variant={'outlined'} onClick={handleNextStep} color="primary"
                            disabled={!isExistNextStep} endIcon={<KeyboardArrowRightIcon />}
                            className={classes.button}
                        >
                            Далее
                        </MuiButton>
                    </div>
                </C.ButtonBox>
                <C.Task>
                    <C.LeftBlock>
                        <H5>Вопрос:</H5>
                        <C.Question>
                            <TextM>{element.description}</TextM>
                        </C.Question>
                        <TextField
                            margin="normal"
                            id="practice-1"
                            label="Введите текст запроса"
                            type="text"
                            variant="outlined"
                            multiline={true}
                            fullWidth={true}
                            minRows={5}
                            value={answer ?? ''}
                            onChange={(e) => {
                                setAnswer(e.target.value)
                            }}
                        />
                        <C.Description>
                            <TextM>
                                Введите SQL запрос и нажмите "Выполнить запрос", чтобы увидеть результат.
                                Чтобы перейти к следующему заданию нажмите "Далее"
                            </TextM>
                        </C.Description>
                        <C.ButtonBox>
                            <div>
                                <Button size={'S'} onClick={handleExecution}>Выполнить запрос</Button>
                            </div>
                            {
                                !isExistNextStep
                                && <Button size={'S'} view={'outlined'} onClick={() => {handleExecution(() => navigate("/react/my-profile"));}}>
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
                    chosenTable &&
                    <C.TableWrapper>
                        <TextM>{chosenTable}</TextM>
                        <ExampleTable tableData={givenTablesData[chosenTable]}/>
                    </C.TableWrapper>
                }
                {
                    null !== sqlResponse &&
                    <C.Block>
                        <ResultBlock data={sqlResponse}/>
                    </C.Block>
                }
            </C.Main>
        </C.Wrapper>
    )
}
