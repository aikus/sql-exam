import React, { useState, useEffect } from 'react';
import * as C from './styles'
import {TextField} from "@mui/material";
import {Button} from "../../components/Button";
import { TextM, TextL, TextS, H2, H5 } from '../../components/Typography'
import {TableToChoose} from "./TableToChoose";
import {ExampleTable} from "./ExampleTable";
import {ResultBlock} from "./ResultBlock";
import {useNavigate} from "react-router-dom";
import {HttpRequest} from "../../Service/HttpRequest";
import {Loader} from "../../components/Loader";
import {UrlService} from "../../Service/UrlService";
import {StudentTableData} from "../../Service/StudentTableData";
import {Notice} from "../../components/Notice";

export const Practice = () => {
    const navigate = useNavigate();
    const [element, setElement] = useState({
        name: null,
        description: null,
        ord: null,
        type: null
    })
    const [practice, setPractice] = useState({
        courseId: null,
        sheetId: null,
        elementId: null,
        answer: null,
        elementCount: 0
    })
    const [chosenTable, setChosenTable] = useState(null)
    const [sqlResponse, setSqlResponse] = useState(null)
    const [givenTables, setGivenTables] = useState([])
    const [givenTablesData, setGivenTablesData] = useState(null)
    const [loader, setLoader] = useState(true)
    const [isNext, setIsNext] = useState(true)
    const [error, setError] = useState(false)

    const urlContainer = (key, id) => {
        if (null === id) {
            throw Error(`Не удалось сделать запрос '${container[key]}'. Отсутствует 'id'`);
        }

        let container = {
            processStart: `/api-process/${id}/start`,
            processAnswer: `/api-process/${id}/answer`,
            processExecution: `/api-process/${id}/execution`,
            courseElement: `/api-platform/course_elements/${id}`,
        };
        return container[key];
    }

    const getStart = () => {
        let course = UrlService.param('course');
        HttpRequest.get(
            urlContainer('processStart', course),
            data => {
                setPractice({
                    courseId: course,
                    elementId: data.elementId,
                    elementCount: data.elementCount,
                })
                setError(false)
                getElement(data.elementId)
            },
            error => {
                setError(error)
                setLoader(false)
            }
        );
    }

    const getElement = id => {
        HttpRequest.get(
            urlContainer('courseElement', id),
            data => {
                setElement({
                    name: data.name,
                    description: data.description,
                    ord: data.ord,
                    type: data.type
                })
                setError(false)
                setLoader(false)
            },
            error => {
                setError(error)
                setLoader(false)
            }
        )
    }

    const handleExecution = () => {
        setLoader(true)
        HttpRequest.post(
            urlContainer('processExecution', UrlService.param('course')),
            {
                answerText: practice.answer,
            },
            data => {
                let id = data.elementId;
                setPractice({
                    elementId: id,
                    elementCount: data.elementCount,
                    answer: data.sqlRequest,
                })
                setSqlResponse(data.response)
                setError(false)
                getElement(id)
            },
            error => {
                setError(error)
                setLoader(false)
            }
        )
    }

    const handleNextStep = () => {
        setLoader(true)
        HttpRequest.post(
            urlContainer('processAnswer', UrlService.param('course')),
            {
                answerText: practice.answer,
            },
            data => {
                let nextElementId = data.elementId;
                if (nextElementId > 0) setIsNext(true);
                setPractice({
                    elementId: nextElementId,
                    elementCount: data.elementCount,
                })
                setError(false)
                getElement(nextElementId)
            },
            error => {
                setError(error)
                setLoader(false)
            }
        )
    }

    const handlePrevStep = () => {

    }

    const setHeader = () => {
        let accumArr = []
        for (let key in givenTablesData[chosenTable][0]) {
            accumArr.push(key)
        }
        return accumArr
    }

    useEffect(() => {
        getStart()
        StudentTableData(data => {
            let dataTableArr = []
            for (let key in data) {
                dataTableArr.push({
                    tableName: [key],
                    linesNum: data[key].length
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
                <TextL>Задание {element.ord} из {practice.elementCount}</TextL>
            </C.Header>
            <C.Main>
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
                            value={practice.answer ?? ''}
                            onChange={(e) => {
                                setPractice({answer: e.target.value})
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
                                <Button size={'S'} view={'outlined'} onClick={handlePrevStep} disabled={true}>Назад</Button>
                                <Button size={'S'} view={'outlined'} onClick={handleNextStep} disabled={!isNext}>Далее</Button>
                            </div>
                            {
                                !isNext
                                && <Button size={'S'} onClick={() => navigate("/react/my-profile")}>
                                    Завершить практику
                                </Button>
                            }
                        </C.ButtonBox>
                    </C.LeftBlock>
                    <C.RightBlock>
                        <TableToChoose tableData={givenTables} setTable={setChosenTable}/>
                    </C.RightBlock>
                </C.Task>
                {chosenTable &&
                    <C.TableWrapper>
                        <TextM>{chosenTable}</TextM>
                        <ExampleTable header={setHeader()} tableData={givenTablesData[chosenTable]}/>
                    </C.TableWrapper>
                }
                {
                    null !== sqlResponse &&
                    <ResultBlock data={sqlResponse}/>
                }
            </C.Main>
        </C.Wrapper>
    )
}
