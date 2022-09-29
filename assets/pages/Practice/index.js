import React, { useState, useEffect } from 'react';
import * as C from './styles'
import { TextField } from "@mui/material";
import {Button} from "../../components/Button";
import { TextM, TextL, TextS, H2, H5 } from '../../components/Typography'
import {TableToChoose} from "./TableToChoose";
import {ExampleTable} from "./ExampleTable";
import {ResultBlock} from "./ResultBlock";
import {useNavigate} from "react-router-dom";

export const Practice = () => {
    const navigate = useNavigate();
    const [taskNum, setTaskNum] = useState(1)
    const [request, setRequest] = useState('')
    const [chosenTable, setChosenTable] = useState(null)
    const [showResultTable, setShowResultTable] = useState(false)

    const checkRequest = () => {
        // логика проверки запроса
        setShowResultTable(true)
    }

    const handgeNextStep = () => {
        setTaskNum((prevState => prevState + 1))
    }

    const handgePrevStep = () => {
        setTaskNum((prevState => prevState - 1))
    }

    const setTableInfo = (item) => {
        let result = []

        for (let key in item) {
            result.push({'tableName': key, 'linesNum': item[key].numOfRows})
        }

        return result
    }

    return (
        <C.Wrapper>
            <C.Link onClick={() => navigate("/react/my-profile")}><TextM>Вернуться к опроснику</TextM></C.Link>
            <C.Header>
                <H2>Задание {taskNum}</H2>
                <TextM>Задание {taskNum} из {data.length}</TextM>
            </C.Header>
            <C.Main>
                <C.Task>
                    <C.LeftBlock>
                        <H5>Вопрос:</H5>
                        <C.Question>
                            <TextM>{data[taskNum - 1].question}</TextM>
                        </C.Question>
                        <TextField
                            margin="normal"
                            id="practice-1"
                            label="Текст запроса"
                            type="text"
                            variant="outlined"
                            multiline={true}
                            fullWidth={true}
                            minRows={5}
                            value={request}
                            onChange={(e) => {
                                setRequest(e.target.value)
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
                                <Button size={'S'} onClick={checkRequest}>Выполнить запрос</Button>
                                <Button size={'S'} view={'outlined'} onClick={handgePrevStep} disabled={taskNum !== 1 ? false : true}>Назад</Button>
                                <Button size={'S'} view={'outlined'} onClick={handgeNextStep} disabled={taskNum !== data.length ? false : true}>Далее</Button>
                            </div>
                            {taskNum === data.length &&
                                <Button size={'S'} onClick={() => navigate("/react/my-profile")}>Завершить практику</Button>
                            }
                        </C.ButtonBox>
                    </C.LeftBlock>
                    <C.RightBlock>
                        <TableToChoose tableData={setTableInfo(data[taskNum - 1].tableToChoose)} setTable={setChosenTable}/>
                    </C.RightBlock>
                </C.Task>
                {chosenTable &&
                    <C.TableWrapper>
                        <TextM>{chosenTable}</TextM>
                        <ExampleTable tableData={data[taskNum - 1].tableToChoose[chosenTable].exampleTable}/>
                    </C.TableWrapper>
                }
                {showResultTable &&
                    <C.TableWrapper>
                        <TextM>Результат запроса</TextM>
                        <ResultBlock/>
                    </C.TableWrapper>
                }
            </C.Main>
        </C.Wrapper>
    )
}

const data = [
    {
        'question': 'Сделать то, использовать это, сортировать так.',
        'tableToChoose': {
            'Таблица 1': {
                'numOfRows': '40',
                'exampleTable': {
                    'header': [
                        {
                            'attribute': 'Атрибут 1',
                            'type': 'VARCHAR'
                        },
                        {
                            'attribute': 'Атрибут 2',
                            'type': 'INT'
                        },
                        {
                            'attribute': 'Атрибут 3',
                            'type': 'LONGTEXT'
                        },
                        {
                            'attribute': 'Атрибут 4',
                            'type': 'DATETIME'
                        }
                    ],
                    'body': [
                        ['Giacoma Guilizzoni', '40', 'Peldi', '2022-04-11 03:18:18'],
                        ['Marco', '38', '', '2022-04-11 03:18:18'],
                        ['Mariah', '20', 'Patata', '2022-04-11 03:18:18'],
                        ['Valerie', '15', 'Val', '2022-04-11 03:18:18']
                    ]
                }
            },
            'Таблица 2': {
                'numOfRows': '38',
                'exampleTable': {
                    'header': [
                        {
                            'attribute': 'Атрибут 1',
                            'type': 'INT'
                        },
                        {
                            'attribute': 'Атрибут 2',
                            'type': 'INT'
                        },
                        {
                            'attribute': 'Атрибут 3',
                            'type': 'LONGTEXT'
                        },
                        {
                            'attribute': 'Атрибут 4',
                            'type': 'DATETIME'
                        }
                    ],
                    'body': [
                        ['1', '2', 'Peldi', '2022-04-11 03:18:18'],
                        ['2', '38', '', '2022-04-11 03:18:18'],
                        ['3', '600', 'Patata', '2022-04-11 03:18:18'],
                        ['4', '1231234', 'Val', '2022-04-11 03:18:18']
                    ]
                }
            },
        }
    },
    {
        'question': 'Сделать SELECT * FROM test',
        'tableToChoose': {
            'Таблица 1': {
                'numOfRows': '12',
                'exampleTable': {
                    'header': [
                        {
                            'attribute': 'Атрибут 1',
                            'type': 'VARCHAR'
                        },
                        {
                            'attribute': 'Атрибут 2',
                            'type': 'INT'
                        },
                        {
                            'attribute': 'Атрибут 3',
                            'type': 'LONGTEXT'
                        },
                        {
                            'attribute': 'Атрибут 4',
                            'type': 'DATETIME'
                        }
                    ],
                    'body': [
                        ['Giacoma Guilizzoni', '40', 'Peldi', '2022-04-11 03:18:18'],
                        ['Marco', '38', '', '2022-04-11 03:18:18'],
                        ['Mariah', '20', 'Patata', '2022-04-11 03:18:18'],
                        ['Valerie', '15', 'Val', '2022-04-11 03:18:18']
                    ]
                }
            },
            'Таблица 2': {
                'numOfRows': '4',
                'exampleTable': {
                    'header': [
                        {
                            'attribute': 'Атрибут 1',
                            'type': 'INT'
                        },
                        {
                            'attribute': 'Атрибут 2',
                            'type': 'INT'
                        },
                        {
                            'attribute': 'Атрибут 3',
                            'type': 'LONGTEXT'
                        },
                        {
                            'attribute': 'Атрибут 4',
                            'type': 'DATETIME'
                        }
                    ],
                    'body': [
                        ['1', '2', 'Peldi', '2022-04-11 03:18:18'],
                        ['2', '38', '', '2022-04-11 03:18:18'],
                        ['3', '600', 'Patata', '2022-04-11 03:18:18'],
                        ['4', '1231234', 'Val', '2022-04-11 03:18:18']
                    ]
                }
            },
            'Таблица 3': {
                'numOfRows': '77',
                'exampleTable': {
                    'header': [
                        {
                            'attribute': 'Атрибут 1',
                            'type': 'INT'
                        },
                        {
                            'attribute': 'Атрибут 2',
                            'type': 'INT'
                        },
                        {
                            'attribute': 'Атрибут 3',
                            'type': 'LONGTEXT'
                        },
                        {
                            'attribute': 'Атрибут 4',
                            'type': 'DATETIME'
                        }
                    ],
                    'body': [
                        ['1', '2', 'Peldi', '2022-04-11 03:18:18'],
                        ['2', '38', '', '2022-04-11 03:18:18'],
                        ['3', '600', 'Patata', '2022-04-11 03:18:18'],
                        ['4', '1231234', 'Val', '2022-04-11 03:18:18']
                    ]
                }
            },
        }
    },
    {
        'question': 'Вывести название и цену для всех анализов, которые продавались 5 февраля 2020 и всю следующую неделю.',
        'tableToChoose': {
            'Таблица 1': {
                'numOfRows': '40',
                'exampleTable': {
                    'header': [
                        {
                            'attribute': 'Атрибут 1',
                            'type': 'VARCHAR'
                        },
                        {
                            'attribute': 'Атрибут 2',
                            'type': 'INT'
                        },
                        {
                            'attribute': 'Атрибут 3',
                            'type': 'LONGTEXT'
                        },
                        {
                            'attribute': 'Атрибут 4',
                            'type': 'DATETIME'
                        }
                    ],
                    'body': [
                        ['Giacoma Guilizzoni', '40', 'Peldi', '2022-04-11 03:18:18'],
                        ['Marco', '38', '', '2022-04-11 03:18:18'],
                        ['Mariah', '20', 'Patata', '2022-04-11 03:18:18'],
                        ['Valerie', '15', 'Val', '2022-04-11 03:18:18']
                    ]
                }
            },
            'Таблица 2': {
                'numOfRows': '38',
                'exampleTable': {
                    'header': [
                        {
                            'attribute': 'Атрибут 1',
                            'type': 'INT'
                        },
                        {
                            'attribute': 'Атрибут 2',
                            'type': 'INT'
                        },
                        {
                            'attribute': 'Атрибут 3',
                            'type': 'LONGTEXT'
                        },
                        {
                            'attribute': 'Атрибут 4',
                            'type': 'DATETIME'
                        }
                    ],
                    'body': [
                        ['1', '2', 'Peldi', '2022-04-11 03:18:18'],
                        ['2', '38', '', '2022-04-11 03:18:18'],
                        ['3', '600', 'Patata', '2022-04-11 03:18:18'],
                        ['4', '1231234', 'Val', '2022-04-11 03:18:18']
                    ]
                }
            },
        }
    },
    {
        'question': 'Вывести название и цену для всех анализов, которые продавались 5 февраля 2020 и всю следующую неделю.',
        'tableToChoose': {
            'Таблица 1': {
                'numOfRows': '40',
                'exampleTable': {
                    'header': [
                        {
                            'attribute': 'Атрибут 1',
                            'type': 'VARCHAR'
                        },
                        {
                            'attribute': 'Атрибут 2',
                            'type': 'INT'
                        },
                        {
                            'attribute': 'Атрибут 3',
                            'type': 'LONGTEXT'
                        },
                        {
                            'attribute': 'Атрибут 4',
                            'type': 'DATETIME'
                        }
                    ],
                    'body': [
                        ['Giacoma Guilizzoni', '40', 'Peldi', '2022-04-11 03:18:18'],
                        ['Marco', '38', '', '2022-04-11 03:18:18'],
                        ['Mariah', '20', 'Patata', '2022-04-11 03:18:18'],
                        ['Valerie', '15', 'Val', '2022-04-11 03:18:18']
                    ]
                }
            },
            'Таблица 2': {
                'numOfRows': '38',
                'exampleTable': {
                    'header': [
                        {
                            'attribute': 'Атрибут 1',
                            'type': 'INT'
                        },
                        {
                            'attribute': 'Атрибут 2',
                            'type': 'INT'
                        },
                        {
                            'attribute': 'Атрибут 3',
                            'type': 'LONGTEXT'
                        },
                        {
                            'attribute': 'Атрибут 4',
                            'type': 'DATETIME'
                        }
                    ],
                    'body': [
                        ['1', '2', 'Peldi', '2022-04-11 03:18:18'],
                        ['2', '38', '', '2022-04-11 03:18:18'],
                        ['3', '600', 'Patata', '2022-04-11 03:18:18'],
                        ['4', '1231234', 'Val', '2022-04-11 03:18:18']
                    ]
                }
            },
        }
    }
]
