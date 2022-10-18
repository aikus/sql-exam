import React, { useState, useEffect } from 'react';
import * as C from './styles'
import { TextField, OutlinedInput, MenuItem, Select, ListItemText, Checkbox, FormControlLabel } from "@mui/material";
import {Button} from "../../components/Button";
import { TextM, TextL, TextS, H2, H3, H5 } from '../../components/Typography'
import {TaskSheet} from './TaskSheet'
import {useNavigate} from "react-router-dom";
import {Loader} from "../../components/Loader";
import {HttpRequest} from '../../Service/HttpRequest'

export const CreateCourse = () => {
  const [step, setStep] = useState(1)
  const [stepsTotal, setStepsTotal] = useState(step)
  const [disableButton, setDisableButton] = useState(true)
  const [loader, setLoader] = useState(false)
  const [courseMainInfo, setCourseMainInfo] = useState({
    courseId: '',
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
    const body = {
      name: courseMainInfo.name,
      description: courseMainInfo.description,
      timeLimit: +courseMainInfo.minForTrie,
      status: "enable"
    }

    const handleSuccess = (data) => {
      setCourseMainInfo(prevState => ({...prevState, courseId: data.id}))
      setLoader(false)
      handleNextStep()
    }

    const handleError = () => {
      setLoader(false)
    }

    HttpRequest.post('http://localhost/api-platform/courses', body, (data) => handleSuccess(data), (error) => handleError())
  }

  const changeCourseReq = () => {
    const body = {
      name: courseMainInfo.name,
      description: courseMainInfo.description,
      timeLimit: +courseMainInfo.minForTrie,
      status: "enable"
    }

    const handleSuccess = (data) => {
      setLoader(false)
      handleNextStep()
    }

    const handleError = () => {
      setLoader(false)
    }

    HttpRequest.put(`http://localhost/api-platform/courses/${courseMainInfo.courseId}`, body, (data) => handleSuccess(data), (error) => handleError())
  }

  const getCourseInfo = (id) => {
    const handleSuccess = (data) => {
      setCourseMainInfo(prevState => ({
        ...prevState,
        courseId: id,
        name: data.name,
        description: data.description,
        minForTrie: data.timeLimit,
        exam: data.timeLimit || data.timeLimit === 0 ? true : false
      }))

      setLoader(false)
    }

    const handleError = () => {
      // setLoader(false)
    }

    HttpRequest.get(`http://localhost/api-platform/courses/${id}`,(data) => handleSuccess(data), (error) => handleError())
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

  const handleInputChange = (value, field) => {
    setCourseMainInfo((prevState) => ({...prevState, [field]: value}))
  };

  useEffect(() => {
    if (courseMainInfo.name && courseMainInfo.description && courseMainInfo.minForTrie) {
      setDisableButton(false)
    } else {
      setDisableButton(true)
    }
  }, [courseMainInfo.name, courseMainInfo.description, courseMainInfo.minForTrie])

  useEffect(() => {
    const courseId = new URL(window.location.href).searchParams.get('course')
    if (courseId) {
      setLoader(true)
      getCourseInfo(courseId)
    }

    // HttpRequest.get
  }, [])

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
                  onChange={(e) => handleInputChange(e.target.value, 'name')}
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
                  onChange={(e) => handleInputChange(e.target.value, 'description')}
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
                      type="number"
                      value={courseMainInfo.numOfTries}
                      onChange={(e) => {
                        if (e.target.value >= 0 && e.target.value <= 100) {
                          handleInputChange(e.target.value, 'numOfTries')
                        }
                      }}
                    />
                    <C.Hint>
                      <TextM>Количество попыток может быть от 0 до 100, где 0 - неограниченное количество</TextM>
                    </C.Hint>
                  </C.FieldBox>
                  <C.FieldBox>
                    <H5>Время на одну попытку в минутах</H5>
                    <TextField
                      required
                      type="number"
                      value={courseMainInfo.minForTrie}
                      onChange={(e) => {
                        if (e.target.value >= 0 && e.target.value <= 480) {
                          handleInputChange(e.target.value, 'minForTrie')
                        }
                      }}
                    />
                    <C.Hint>
                      <TextM>Время может быть от 0 до 480 минут, где 0 - неограниченное время</TextM>
                    </C.Hint>
                  </C.FieldBox>
                </C.CheckBoxControled>
              }
              <Button
                onClick={() => {
                  // setLoader(true)
                  // if (courseMainInfo.courseId) {
                  //   changeCourseReq()
                  // } else {
                  //   createCourseReq()
                  // }
                }}
                disabled={disableButton}
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

        <Loader show={loader}/>
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