import React, { useState } from 'react';
import * as C from '/assets/pages/CreateCourse/styles'
import {
  Box,
  Button, ButtonGroup, Divider, Grid, IconButton,
  MenuItem,
  Select, Typography,
} from "@mui/material";
import { Loader } from "/assets/components/Loader";
import {CourseElementRepository} from "./CourseElementRepository";
import { DialogWinDelete } from "/assets/components/DialogWinDelete";
import {useNavigate} from "react-router-dom";
import { searchParam } from "/assets/Service/SearchParamActions";
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import {convertObjToHTML, convertHTMLtoObj} from "./index";
import { EditorState } from 'draft-js';
import { SqlPracticeType } from "/assets/pages/CreateCourse/CourseElementType/SqlPracticeType";
import { ArticleType } from "./CourseElementType/ArticleType";
import { TypeBuilder } from "./CourseElementType/Component/TypeBuilder";
import { PollType } from "./CourseElementType/PollType";
import { CourseElementPollOptionRepository } from "/assets/Repositories/CourseElementPollOptionRepository";
import { Close } from "@mui/icons-material";

export const TaskSheet = ({step, nextStep, prevStep, deleteStep, courseContent, setCourseContent, course, courseId}) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const currentCourseElement = () => courseContent[step - 1];

  const typeList = () => {
    return [
      {name: 'Текст', type: 'article'},
      {name: 'Практика Mysql', type: 'mysql'},
      {name: 'Практика Postgres', type: 'postgres'},
      {name: 'Опрос с вариантами', type: 'poll'},
    ];
  }

  const handleSelectChange = (e) => {
    const actual = currentCourseElement();
    actual['type'] = e.target.value;

    setCourseContent((prevState) => {
      let newState = [...prevState]
      newState[step - 1] = TypeBuilder.mapActualType(actual)
      return newState
    })
  }

  const handleInputChange = (value, field) => {
    setCourseContent((prevState) => {
      let newState = [...prevState]
      newState[step - 1][field] = value

      return newState
    })
  }
  const handlePollChange = options => {
    setCourseContent((prevState) => {
      let newState = [...prevState]
      newState[step - 1].pollOptionsData = options
      newState[step - 1].pollOptions = options.map(option => {
        if (!option.hasOwnProperty('id')) return;
        return '/api-platform/course_element_poll_options/'+option.id
      })

      return newState
    })
  }

  const handlePoll = (courseElement) => {
    const statePollOptions = courseElement?.pollOptionsData;

    if (null === statePollOptions || undefined === statePollOptions) return;

    statePollOptions.map(option => {
      CourseElementPollOptionRepository.save(option, courseElement.id).then(data => {
        console.log('handlePoll', data)
      })
    })
  }

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

    handlePoll(newState[_step - 1])
    newState[_step - 1].pollOptions = [];

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

  const handleNextStep = (lastStep) => {
    nextStep(lastStep)
  }

  const handlePrevStep = () => {
    prevStep()
  }

  const handleExitCourse = () => {
    navigate("/react/my-profile/course-management");
  }

  const handleClose = () => {
    setDialogOpen(false)
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

  const renderCourseElementType = (courseElement) => {
    const container = {
      article: getArticleType,
      mysql: getSqlPracticeType,
      postgres: getSqlPracticeType,
      oracle: getSqlPracticeType,
      poll: getPollType,
    }
    return container[courseElement.type](courseElement);
  }

  const getArticleType = courseElement => {
    return <ArticleType step={step} courseElement={courseElement} handleInputChange={handleInputChange} />
  }

  const getSqlPracticeType = courseElement => {
    return <SqlPracticeType step={step} courseElement={courseElement} handleInputChange={handleInputChange} />
  }

  const getPollType = courseElement => {
    return <PollType step={step} courseElement={courseElement} handleInputChange={handleInputChange} handlePollChange={handlePollChange} />
  }

  return (
    <>
      <Grid container justifyContent="space-between" spacing={2}>
        <Grid item xs={'auto'}>
          <ButtonGroup>
            <Button
              size='medium'
              variant='outlined'
              color="secondary"
              onClick={() => handlePrevStep()}
              startIcon={<ChevronLeftRoundedIcon/>}
            >
              Назад
            </Button>
            <Button
              size='medium'
              variant='outlined'
              color="secondary"
              onClick={() => handleNextStep()}
              disabled={courseContent.length === step}
              endIcon={<ChevronRightRoundedIcon />}
            >
              Далее
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs alignSelf={'center'}>
          <Typography>{course.name}</Typography>
        </Grid>
        <Grid item xs='auto'>
          <IconButton
              variant='outlined'
              color='secondary'
              onClick={handleExitCourse}
          >
            <Close />
          </IconButton>
        </Grid>
      </Grid>
      <Divider sx={{my: 2}} />
      <Box>
        <Typography sx={{my: 1}}>Выберите тип шага</Typography>
        <Select
          name={'type'}
          value={currentCourseElement().type}
          onChange={(e) => handleSelectChange(e)}
          sx={{minWidth: '150px'}}
        >
          {
            typeList().map((item, i) =>
              <MenuItem key={i} value={item.type}>{item.name}</MenuItem>
            )
          }
        </Select>
      </Box>

      {renderCourseElementType(currentCourseElement())}

      <C.ButtonsBlock>
        <C.StepActions>
          <Button variant='contained' color='secondary' onClick={() => setDialogOpen(true)}>Удалить шаг</Button>
          <Button variant='contained' color='secondary' onClick={() => handleSaveStep()}>Сохранить шаг</Button>
          <Button variant='contained' color='primary' onClick={handleCreateStep}>Добавить шаг</Button>
        </C.StepActions>
        {searchParam.get('course')
          ?
          <Button variant='contained' onClick={handleExitCourse}>Завершить редактирование курса</Button>
          :
          <Button variant='contained' onClick={() => handleSaveStep(courseContent.length, true)}>Завершить создание курса</Button>
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