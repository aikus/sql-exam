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
    setCourseContent(prevState => ([{
      'type': e.target.value,
      'question': '',
    }]))
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