import React, {useRef, useState} from 'react';
import * as C from './styles'
import {
  Button, ButtonGroup,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField
} from "@mui/material";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import {Loader} from "../../components/Loader";
import {H5, TextM} from '../../components/Typography'
import {CourseElementRepository} from "./CourseElementRepository";
import {DialogWinDelete} from "../../components/DialogWinDelete";
import {useNavigate} from "react-router-dom";
import {searchParam} from "../../Service/SearchParamActions";
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import {Editor} from "react-draft-wysiwyg";
import {wysiwygConfig} from "../../config";
import {SyntaxHighlightingField} from "../../components/SyntaxHighlightingField";
import {convertObjToHTML, convertHTMLtoObj} from "./index";
import { EditorState } from 'draft-js';

export const TaskSheet = ({step, nextStep, prevStep, deleteStep, courseContent, setCourseContent, courseId}) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const inputEl = useRef(null);
  const isPractice = type => ['mysql', 'postgres', 'oracle'].includes(type);

  const handleSaveStep = (stepToSave, exitAfterSave) => {
    const _step = stepToSave || step;
    setLoader(true);
    let newState = [];

    courseContent.forEach((item) => {
      newState.push(deepCopy({}, item))
    });

    if(!newState[_step - 1].ord) {
      newState[_step - 1].ord = _step;
    }

    newState[_step - 1].description = convertObjToHTML(newState[_step - 1].description);

    CourseElementRepository.save(newState[_step - 1], courseId).then(
      data => {
        data.description = convertHTMLtoObj(data.description);
        newState[_step - 1] = data;
        setCourseContent(newState);
        setLoader(false);
        if (exitAfterSave) {
          handleExitCourse();
        }
      }
    );
  }

  const handleCreateStep = () => {
    setLoader(true);
    let newState = [];

    courseContent.forEach((item) => {
      newState.push(deepCopy({}, item))
    });

    if(!newState[courseContent.length - 1].ord) {
      newState[courseContent.length - 1].ord = courseContent.length;
    }

    newState[courseContent.length - 1].description = convertObjToHTML(newState[courseContent.length - 1].description);

    CourseElementRepository.save(newState[courseContent.length - 1], courseId).then(
      data => {
        data.description = convertHTMLtoObj(data.description);
        newState[courseContent.length - 1] = data;
        newState.push({
          'type': 'article',
          'name': '',
          'description': EditorState.createEmpty(),
        })
        setCourseContent(newState);
        setLoader(false);
        handleNextStep(courseContent.length);
      }
    );
  }

  const handleNextStep = (lastStep) => {
    nextStep(lastStep)
  }

  const handlePrevStep = () => {
    prevStep()
  }

  const handleInputChange = (value, field) => {
    setCourseContent((prevState) => {
      let newState = [...prevState]
      newState[step - 1][field] = value

      return newState
    })
  }

  const handleExitCourse = () => {
    navigate("/react/my-profile/course-management");
  }

  const handleDeleteStep = () => {
    setLoader(true)

    CourseElementRepository.delete(courseContent[step - 1]).then(
      data => {
        deleteStep()
        setLoader(false)
      }
    ).catch(() => {
      setLoader(false)
    });

    handleClose()
  }

  const handleClose = () => {
    setDialogOpen(false)
  }

  const typeList = () => {
    return [
      {name: 'Текст', type: 'article'},
      {name: 'Практика Mysql', type: 'mysql'},
      {name: 'Практика Postgres', type: 'postgres'},
      {name: 'Опрос с вариантами', type: 'poll'},
    ];
  }

  const handleSelectChange = (e) => {
    const actual = courseContent[step - 1];

    const typeObject = {
      'type': e.target.value,
      'name': actual && (actual?.name ?? ''),
      'description': actual && (actual?.description ?? ''),
    }

    if(actual && actual.id) {
      typeObject['id'] = actual.id;
    }

    if (isPractice(e.target.value)) {
      typeObject['answer'] = '';
    } else if (e.target.value === 'poll') {
      typeObject["description"] = '';
      typeObject["variants"] = ['', ''];
      typeObject["right-variant"] = '';
    }

    setCourseContent((prevState) => {
      let newState = [...prevState]
      newState[step - 1] = typeObject
      return newState
    })
  }

  const deepCopy = (targetObj, sourceObj) => {
    if (targetObj && sourceObj) {
      for (let x in sourceObj) {
        if (sourceObj.hasOwnProperty(x)) {
          if (targetObj[x] && typeof sourceObj[x] === 'object') {
            targetObj[x] = deepCopy(targetObj[x], sourceObj[x]);
          } else {
            targetObj[x] = sourceObj[x];
          }
        }
      }
    }
    return targetObj;
  };

  return (
    <>
      <C.MovementButtons>
        <ButtonGroup>
          <Button
            size='medium'
            variant='outlined'
            onClick={() => handlePrevStep()}
            color="secondary"
            startIcon={<ChevronLeftRoundedIcon/>}
          >
            Назад
          </Button>
          <Button
            size='medium'
            variant='outlined'
            onClick={() => handleNextStep()}
            color="secondary"
            disabled={courseContent.length === step}
            endIcon={<ChevronRightRoundedIcon />}
          >
            Далее
          </Button>
        </ButtonGroup>
      </C.MovementButtons>
      <C.Type>
        <H5>Выберите тип шага</H5>
        <Select
          value={courseContent[step - 1].type}
          onChange={(e) => handleSelectChange(e)}
          sx={{minWidth: '150px'}}
        >
          {
            typeList().map((item, i) =>
              <MenuItem key={i} value={item.type}>{item.name}</MenuItem>
            )
          }
        </Select>
      </C.Type>
      <C.HeaderBlock>
        <H5>Введите заголовок</H5>
        <TextField
          required
          id={`course-element-name-${step}`}
          type="text"
          variant="outlined"
          multiline={false}
          fullWidth={true}
          minRows={5}
          value={courseContent[step - 1].name}
          onChange={(e) => handleInputChange(e.target.value, 'name')}
        />
      </C.HeaderBlock>
      <C.QuestionBlock>
        <H5>Введите текст</H5>
        <Editor
          id={`course-${step}`}
          editorState={courseContent[step - 1].description}
          editorClassName='wysiwyg-editor'
          toolbarClassName='wysiwyg-toolbar'
          toolbar={wysiwygConfig}
          onEditorStateChange={(e) => handleInputChange(e, 'description')}
        />
      </C.QuestionBlock>
      {isPractice(courseContent[step - 1].type) &&
        <C.AnswerBlock>
          <H5>Введите SQL-запрос, по которому система будет определять правильность ответа инженера</H5>
          <SyntaxHighlightingField
            elementRef={inputEl}
            value={courseContent[step - 1].answer}
            getValue={(value) => handleInputChange(value, 'answer')}
          />
        </C.AnswerBlock>
      }
      <C.ButtonsBlock>
        <C.StepActions>
          <Button variant='outlined' size='medium' onClick={() => setDialogOpen(true)}>Удалить шаг</Button>
          <Button variant='outlined' size='medium' onClick={() => handleSaveStep()}>Сохранить шаг</Button>
          <Button variant='contained' size='medium' onClick={handleCreateStep}>Добавить шаг</Button>
        </C.StepActions>
        {searchParam.get('course') ?
          <Button variant='contained' size='medium' onClick={handleExitCourse}>Завершить редактирование курса</Button>
          :
          <Button variant='contained' size='medium' onClick={() => handleSaveStep(courseContent.length, true)}>Завершить создание курса</Button>
        }
      </C.ButtonsBlock>

      <Loader show={loader}/>
      <DialogWinDelete
        isOpen={dialogOpen}
        handleDelete={handleDeleteStep}
        handleClose={handleClose}
        whatToDelete={'шаг'}
      />
    </>
  )
}