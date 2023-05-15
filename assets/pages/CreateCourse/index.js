import React, { useState, useEffect } from 'react';
import * as C from './styles'
import { TextField, OutlinedInput, MenuItem, Select, ListItemText, Checkbox, FormControlLabel, Button } from "@mui/material";
import { TextM, TextL, TextS, H2, H3, H5 } from '../../components/Typography'
import { TaskSheet } from './TaskSheet'
import { Loader } from "../../components/Loader";
import { HttpRequest } from '../../Service/HttpRequest'
import { CourseElementRepository } from "../../Repositories/CourseElementRepository";
import { wysiwygConfig } from '../../config'
import { searchParam } from "../../Service/SearchParamActions";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ContentState, EditorState, convertFromHTML, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

export const CreateCourse = () => {
  const [step, setStep] = useState(0)
  const [stepsTotal, setStepsTotal] = useState(step)
  const [loader, setLoader] = useState(false)
  const [courseMainInfo, setCourseMainInfo] = useState({
    courseId: '',
    name: '',
    description: EditorState.createEmpty(),
    intendedFor: [],
    exam: false,
    numOfTries: '',
    minForTrie: ''
  });
  const defaultElement = {
    'type': 'article',
    'description': EditorState.createEmpty(),
    'name': '',
  };
  const [courseContent, setCourseContent] = useState([defaultElement]);

  const createCourseReq = () => {
    const body = {
      name: courseMainInfo.name,
      description: convertObjToHTML(courseMainInfo.description),
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

    HttpRequest.post(`/api-platform/courses`, body, (data) => handleSuccess(data), (error) => handleError())
  }

  const changeCourseReq = () => {
    const body = {
      name: courseMainInfo.name,
      description: convertObjToHTML(courseMainInfo.description),
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

    HttpRequest.put(`/api-platform/courses/${courseMainInfo.courseId}`, body, (data) => handleSuccess(data), (error) => handleError())
  }

  const getCourseInfo = (id) => {
    const handleSuccess = (data) => {
      setCourseMainInfo(prevState => ({
        ...prevState,
        courseId: id,
        name: data.name,
        description: convertHTMLtoObj(data.description),
        minForTrie: data.timeLimit,
        exam: data.timeLimit || data.timeLimit === 0 ? true : false
      }));

      CourseElementRepository.getByCourse(data).then(elements => {
        const elemExist = elements && elements.length > 0;
        let modifiedElem = [];

        if (elemExist) {
          modifiedElem = [...elements];
          modifiedElem.forEach((item, i) => {
            item.description = convertHTMLtoObj(item.description);
          });
        }

        setCourseContent(elements && elements.length > 0 ? elements : [defaultElement])
        if (elemExist) {
          setStepsTotal(elements.length)
        }

        setLoader(false)
      });
    }

    const handleError = () => {
      setLoader(false)
    }

    HttpRequest.get(`/api-platform/courses/${id}`,(data) => handleSuccess(data), (error) => handleError())
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

  const handleNextStep = (lastStep) => {
    if (step + 1 > stepsTotal || lastStep) {
      setStepsTotal((prevState) => prevState + 1)
    }
    if (lastStep) {
      setStep(lastStep + 1);
    } else {
      setStep(prevState => prevState + 1);
    }
  };

  const handlePrevStep = () => {
    setStep(prevState => prevState - 1);
  };

  const handleInputChange = (value, field) => {
    setCourseMainInfo((prevState) => ({...prevState, [field]: value}))
  };

  const deleteStep = () => {
    if (step === stepsTotal && step === 1) {
      setCourseContent([defaultElement])
    } else {
      setCourseContent((prevState) => {
        let newState = [...prevState]
        newState.splice(step - 1, 1)
        return newState
      })
    }

    if (step === stepsTotal) {
      setStep(prevState => prevState - 1);
    }

    setStepsTotal((prevState) => prevState - 1)
  };

  useEffect(() => {
    const courseId = searchParam.get('course')
    if (courseId) {
      setLoader(true)
      getCourseInfo(courseId)
    }
  }, [])

  const onDescriptionChange = newState => {
    setCourseMainInfo(prevState => ({...prevState, description: newState}));
  };

  return (
      <C.Wrapper>
        <C.Header>
          <H2>{searchParam.get('course') ? 'Редактирование курса' : 'Создание нового курса'}</H2>
          {step !== 0 &&
            <TextL style={{textAlign: 'center'}}>Шаг {step}&nbsp;из&nbsp;{stepsTotal}</TextL>
          }
        </C.Header>
        <C.Main>
          {step === 0 &&
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
                <Editor
                  editorState={courseMainInfo.description}
                  editorClassName='wysiwyg-editor'
                  toolbarClassName='wysiwyg-toolbar'
                  toolbar={wysiwygConfig}
                  onEditorStateChange={(e) => handleInputChange(e, 'description')}
                />
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
              <Button
                variant='contained'
                size='large'
                onClick={() => {
                  setLoader(true)
                  if (courseMainInfo.courseId) {
                    changeCourseReq()
                  } else {
                    createCourseReq()
                  }
                }}
              >{searchParam.get('course') ? 'Далее' : 'Создать шаг'}</Button>
            </C.FirstStep>
          }
          {step >= 1 &&
            <TaskSheet
              step={step}
              nextStep={handleNextStep}
              prevStep={handlePrevStep}
              deleteStep={deleteStep}
              courseContent={courseContent}
              setCourseContent={setCourseContent}
              course={courseMainInfo}
              courseId={courseMainInfo.courseId}
            />
          }
        </C.Main>

        <Loader show={loader}/>
      </C.Wrapper>
  )
}

export const convertHTMLtoObj = (description) => {
  const fromHTML = convertFromHTML(description);

  const newState = ContentState.createFromBlockArray(
    fromHTML.contentBlocks,
    fromHTML.entityMap,
  );

  return EditorState.createWithContent(newState);
}

export const convertObjToHTML = (obj) => {
  return draftToHtml(convertToRaw(obj.getCurrentContent()));
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