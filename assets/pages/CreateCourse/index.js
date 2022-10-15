import React, { useState, useEffect } from 'react';
import * as C from './styles'
import { TextField, OutlinedInput, MenuItem, Select, ListItemText, Checkbox, FormControlLabel } from "@mui/material";
import {Button} from "../../components/Button";
import { TextM, TextL, TextS, H2, H3, H5 } from '../../components/Typography'
import {TaskSheet} from './TaskSheet'
import {useNavigate} from "react-router-dom";

export const CreateCourse = () => {
  const [step, setStep] = useState(1)
  const [stepsTotal, setStepsTotal] = useState(step)
  const [courseMainInfo, setCourseMainInfo] = useState({
    name: '',
    description: '',
    intendedFor: [],
    exam: false,
    numOfTries: '',
    minForTrie: ''
  })
  const [courseContent, setCourseContent] = useState([
    {
      'type': 'текст',
      'question': '',
    }
  ])

  const createCourseReq = () => {
    fetch('http://localhost/api-platform/courses', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
      },
      body: JSON.stringify({
        name: courseMainInfo.name,
        description: courseMainInfo.description,
        timeLimit: 0,
        status: "string"
      })
    })
        .then(response => response.json())
        .then(data => {
          console.log('data: ', data)
        })
  }

  const handleIntendedForChange = (event) => {
    const {
      target: { value },
    } = event;
    setCourseMainInfo(prevState => ({...prevState, intendedFor: typeof value === 'string' ? value.split(',') : value}));
  };

  const handleExamChange = (event) => {
    setCourseMainInfo(prevState => ({...prevState, exam: event.target.checked}));
  };

  const handleNextStep = () => {
    if (step + 1 > stepsTotal) {
      setStepsTotal((prevState) => prevState + 1)
    }
    setStep(prevState => prevState + 1);
  };

  const handlePrevStep = () => {
    setStep(prevState => prevState - 1);
  };

  return (
      <C.Wrapper>
        <C.Header>
          <H2>Создание нового курса</H2>
          <TextL>Шаг {step} из {stepsTotal}</TextL>
        </C.Header>
        <C.Main>
          {step === 1 &&
            <C.FirstStep>
              <C.FieldBox>
                <H5>Название курса</H5>
                <TextField
                  required
                  type="text"
                  multiline={true}
                  fullWidth={true}
                  value={courseMainInfo.name}
                  onChange={(e) => {
                    setCourseMainInfo((prevState) => ({...prevState, name: e.target.value}))
                  }}
                />
              </C.FieldBox>
              <C.FieldBox>
                <H5>Описание курса</H5>
                <TextField
                  required
                  placeholder="Введите описание"
                  type="text"
                  multiline={true}
                  fullWidth={true}
                  minRows={5}
                  value={courseMainInfo.description}
                  onChange={(e) => {
                    setCourseMainInfo((prevState) => ({...prevState, description: e.target.value}))
                  }}
                />
              </C.FieldBox>
              <C.FieldBox>
                <H5>Принадлежность</H5>
                <Select
                  multiple
                  displayEmpty
                  value={courseMainInfo.intendedFor}
                  onChange={handleIntendedForChange}
                  input={<OutlinedInput />}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <TextL>Для всех (общий)</TextL>;
                    }

                    return selected.join(', ');
                  }}
                  MenuProps={MenuProps}
                  sx={{minWidth: '300px', maxWidth: '100%'}}
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={courseMainInfo.intendedFor.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </C.FieldBox>
              <C.CheckBoxWrapper>
                <FormControlLabel control={<Checkbox checked={courseMainInfo.exam} onChange={handleExamChange}/>} label="Экзамен" />
                <TextM>При нажатии на чекбокс, выставляется ограничение по времени и количеству попыток прохождения</TextM>
              </C.CheckBoxWrapper>
              {courseMainInfo.exam &&
                <C.CheckBoxControled>
                  <C.FieldBox>
                    <H5>Количество попыток</H5>
                    <TextField
                      required
                      type="number"
                      value={courseMainInfo.numOfTries}
                      onChange={(e) => {
                        setCourseMainInfo((prevState) => ({...prevState, numOfTries: e.target.value}))
                      }}
                    />
                  </C.FieldBox>
                  <C.FieldBox>
                    <H5>Время на одну попытку в минутах</H5>
                    <TextField
                      required
                      type="number"
                      value={courseMainInfo.minForTrie}
                      onChange={(e) => {
                        setCourseMainInfo((prevState) => ({...prevState, minForTrie: e.target.value}))
                      }}
                    />
                  </C.FieldBox>
                </C.CheckBoxControled>
              }
              <Button
                onClick={() => {
                  // createCourseReq()
                  handleNextStep()
                }}
              >Далее</Button>
            </C.FirstStep>
          }
          {step >= 2 &&
            <TaskSheet
              step={step}
              nextStep={handleNextStep}
              prevStep={handlePrevStep}
              courseContent={courseContent}
              setCourseContent={setCourseContent}
            />
          }
        </C.Main>
      </C.Wrapper>
  )
}

const names = [
  'Потребы',
  'Кредитная карты',
  'Ипотека',
  'Доставка',
  'Sales',
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};