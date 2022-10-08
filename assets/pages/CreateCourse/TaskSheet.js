import React, { useState, useEffect } from 'react';
import * as C from './styles'
import { TextField, OutlinedInput, MenuItem, Select, ListItemText, Checkbox, FormControlLabel } from "@mui/material";
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
        'variant-1': '',
        'variant-2': '',
        'variant-3': '',
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

  const handlePrevStep = () => {
    prevStep()
  }

  return (
    <>
      <C.Type>
        <H5>Выберите тип шага</H5>
        <Select
          value={courseContent[step - 2].type}
          onChange={(e) => handleSelectChange(e)}
        >
          <MenuItem value={'текст'}>Текст</MenuItem>
          <MenuItem value={'практика'}>Практика</MenuItem>
          <MenuItem value={'тест'}>Тест</MenuItem>
        </Select>
      </C.Type>
      {/*<C.QuestionBlock>*/}
      {/*  <H5>Введите текст вопроса</H5>*/}
      {/*  <TextField*/}
      {/*    margin="normal"*/}
      {/*    id="course-1"*/}
      {/*    type="text"*/}
      {/*    variant="outlined"*/}
      {/*    multiline={true}*/}
      {/*    fullWidth={true}*/}
      {/*    minRows={5}*/}
      {/*    value={request}*/}
      {/*    onChange={(e) => {*/}
      {/*      setRequest(e.target.value)*/}
      {/*    }}*/}
      {/*  />*/}
      {/*</C.QuestionBlock>*/}
      <Button onClick={handlePrevStep}>Назад</Button>
      <Button onClick={handleNextStep}>Далее</Button>
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