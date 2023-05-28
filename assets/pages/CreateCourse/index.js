import React, { useState, useEffect } from 'react';
import * as C from './styles'
import { TextField, Button } from "@mui/material";
import { TextM, TextL, H2, H5 } from '../../components/Typography'
import { TaskSheet } from './TaskSheet'
import { Loader } from "../../components/Loader";
import { HttpRequest } from '../../Service/HttpRequest'
import { CourseElementRepository } from "../../Repositories/CourseElementRepository";
import { wysiwygConfig } from '../../config'
import { searchParam } from "../../Service/SearchParamActions";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ContentState, EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import {SqlMetaTypeRepository} from "./SqlMetaTypeRepository";
import htmlToDraft from 'html-to-draftjs';

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
    minForTrie: 0
  });
  const defaultElement = {
    'type': 'article',
    'description': EditorState.createEmpty(),
    'name': '',
  };
  const [courseContent, setCourseContent] = useState([defaultElement]);
  const [sqlMetaTypes, setSqlMetaTypes] = useState(null);

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
    const courseId = searchParam.get('course');
    if (courseId) {
      setLoader(true)
      getCourseInfo(courseId)
    }
    if(!sqlMetaTypes) {
      SqlMetaTypeRepository.get().then(setSqlMetaTypes);
    }
  }, [])

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
                <H5>Название курса <C.Asterisk>*</C.Asterisk></H5>
                <TextField
                  required
                  type="text"
                  multiline={true}
                  fullWidth={true}
                  value={courseMainInfo.name}
                  onChange={(e) => {
                    if (e.target.value.length > 64) return;
                    handleInputChange(e.target.value, 'name');
                  }}
                />
                <C.HelperWithCounter>
                  <TextM>Максимум 64 символа</TextM>
                  <TextM>{courseMainInfo.name?.length || 0}/64</TextM>
                </C.HelperWithCounter>
              </C.FieldBox>
              <C.FieldBox>
                <H5>Описание курса <C.Asterisk>*</C.Asterisk></H5>
                <Editor
                  editorState={courseMainInfo.description}
                  editorClassName='wysiwyg-editor'
                  toolbarClassName='wysiwyg-toolbar'
                  toolbar={wysiwygConfig}
                  onEditorStateChange={(e) => handleInputChange(e, 'description')}
                />
              </C.FieldBox>
              <C.FieldBox>
                <H5>Время на одну попытку в минутах <C.Asterisk>*</C.Asterisk></H5>
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
              metaTypes={sqlMetaTypes}
            />
          }
        </C.Main>

        <Loader show={loader}/>
      </C.Wrapper>
  )
}

export const convertHTMLtoObj = (description) => {
  const contentBlock = htmlToDraft(description);
  const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);

  return EditorState.createWithContent(contentState);
}

export const convertObjToHTML = (obj) => {
  const html = draftToHtml(convertToRaw(obj.getCurrentContent()));

  return html.replace('<p></p>', '<p>&nbsp;</p>');
}
