import React, { useState, useEffect } from 'react';
import * as C from './styles'
import { TextField, MenuItem, Select, FormControlLabel, RadioGroup, Radio, InputAdornment, IconButton } from "@mui/material";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import {Button} from "../../components/Button";
import { TextM, TextL, TextS, H2, H3, H5 } from '../../components/Typography'

export const TaskSheet = ({step, nextStep, prevStep}) => {
  const [courseContent, setCourseContent] = useState([
    {
      'type': 'текст',
      'question': '',
    }
  ])

  const handleSelectChange = (e) => {
    let typeObject = {}

    if (e.target.value === 'текст' && courseContent[step - 2].type !== 'текст') {
      typeObject = {
        'type': 'текст',
        'question': '',
      }
    } else if (e.target.value === 'практика' && courseContent[step - 2].type !== 'практика') {
      typeObject = {
        'type': 'практика',
        'question': '',
        'answer': ''
      }
    } else if (e.target.value === 'тест' && courseContent[step - 2].type !== 'тест') {
      typeObject = {
        'type': 'тест',
        'question': '',
        'variants': [
          '',
          ''
        ],
        'right-variant': ''
      }
    }

    setCourseContent((prevState) => {
      let newState = [...prevState]
      newState[step - 2] = typeObject
      return newState
    })
  }

  const handleNextStep = () => {
    setCourseContent((prevState) => {
      let newState = [...prevState]

      newState.push({
        'type': 'текст',
        'question': '',
      })

      return newState
    })

    nextStep()
  }

  const handleQuestion = (e) => {
    setCourseContent((prevState) => {
      let newState = [...prevState]
      newState[step - 2].question = e.target.value

      return newState
    })
  }

  const handleAnswer = (e) => {
    setCourseContent((prevState) => {
      let newState = [...prevState]
      newState[step - 2].answer = e.target.value

      return newState
    })
  }

  const handlePrevStep = () => {
    prevStep()
  }

  const handleVariantInput = (value, i) => {
    setCourseContent((prevState) => {
      let newState = [...prevState]
      newState[step - 2].variants[i] = value

      return newState
    })
  }

  const handleVariantDelete = (i) => {
    setCourseContent((prevState) => {
      let newState = [...prevState]
      newState[step - 2].variants.splice(i, 1)

      return newState
    })
  }

  const addVariant = () => {
    setCourseContent((prevState) => {
      let newState = [...prevState]
      newState[step - 2].variants.push('')

      return newState
    })
  }

  return (
    <>
      <C.Type>
        <H5>Выберите тип шага</H5>
        <Select
          value={courseContent[step - 2].type}
          onChange={(e) => handleSelectChange(e)}
          sx={{minWidth: '150px'}}
        >
          <MenuItem value={'текст'}>Текст</MenuItem>
          <MenuItem value={'практика'}>Практика</MenuItem>
          <MenuItem value={'тест'}>Тест</MenuItem>
        </Select>
      </C.Type>
      <C.QuestionBlock>
        <H5>Введите текст вопроса</H5>
        <TextField
          required
          id={`course-${step}`}
          type="text"
          variant="outlined"
          multiline={true}
          fullWidth={true}
          minRows={5}
          value={courseContent[step - 2].question}
          onChange={(e) => handleQuestion(e)}
        />
      </C.QuestionBlock>
      {courseContent[step - 2].type === 'практика' &&
        <C.AnswerBlock>
          <H5>Введите SQL-запрос, по которому система будет определять правильность ответа инженера</H5>
          <TextField
            required
            id={`course-${step}-2`}
            type="text"
            variant="outlined"
            multiline={true}
            fullWidth={true}
            minRows={5}
            value={courseContent[step - 2].answer}
            onChange={(e) => handleAnswer(e)}
          />
        </C.AnswerBlock>
      }
      {courseContent[step - 2].type === 'тест' &&
        <C.VariantsBlock>
          <Button size={'S'} onClick={addVariant}>Добавить вариант</Button>
          <C.VariantsRow>
            <RadioGroup
              name={`course-answer-group-${step}`}
            >
              {courseContent[step - 2].variants.map((item, i) => {
                return (
                  <C.Row key={i}>
                    <TextM>Вариант {i + 1}</TextM>
                    <TextField
                      required
                      id={`course-answer-${step}-${i + 1}`}
                      type="text"
                      variant="outlined"
                      multiline={true}
                      fullWidth={true}
                      value={item}
                      onChange={(e) => handleVariantInput(e.target.value, i)}
                      size={'small'}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">
                          <IconButton
                            onClick={() => handleVariantDelete(i)}
                            edge="end"
                          >
                            <DeleteForeverRoundedIcon/>
                          </IconButton>
                        </InputAdornment>,
                      }}
                    />
                    <FormControlLabel value={i + 1} control={<Radio />} label="Правильный ответ" />
                  </C.Row>
                )
              })}
            </RadioGroup>
          </C.VariantsRow>
        </C.VariantsBlock>
      }
      <C.ButtonsBlock>
        <div>
          <Button onClick={handlePrevStep} view='outlined' size={'S'}>Назад</Button>
          <Button onClick={handleNextStep} size={'S'}>Далее</Button>
        </div>
        <Button size={'S'}>Завершить создание курса</Button>
      </C.ButtonsBlock>
      <div onClick={() => {
        console.log(courseContent)
      }}>GGG</div>
    </>
  )
}

const test = [
  {
    'type': 'текст',
    'question': '',
  },
  {
    'type': 'тест',
    'question': '',
    'variant-1': '',
    'variant-2': '',
    'variant-3': '',
    'right-variant': ''
  },
  {
    'type': 'практика',
    'question': '',
    'answer': ''
  },
]