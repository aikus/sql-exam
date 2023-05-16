import React, {useState} from 'react';
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

export const TaskSheet = ({step, nextStep, prevStep, deleteStep, courseContent, setCourseContent, courseId, metaTypes}) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const isPractice = type => ['mysql', 'postgres', 'oracle', 'sql'].includes(type);

  const handleSelectChange = (e) => {
    const actual = courseContent[step - 1];

    const typeObject = {
      'type': e.target.value,
      'name': actual && actual.name ? actual.name : '',
      'description': actual && actual.description ? actual.description : '',
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

  const handleSaveStep = (stepToSave, exitAfterSave) => {
    const _step = stepToSave || step;
    setLoader(true);
    let newState = [...courseContent];

    if(!newState[_step - 1].ord) {
      newState[_step - 1].ord = _step;
    }

    CourseElementRepository.save(newState[_step - 1], courseId).then(
      data => {
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
    let newState = [...courseContent];

    if(!newState[courseContent.length - 1].ord) {
      newState[courseContent.length - 1].ord = courseContent.length;
    }

    CourseElementRepository.save(newState[courseContent.length - 1], courseId).then(
      data => {
        newState[courseContent.length - 1] = data;
        newState.push({
          'type': 'article',
          'name': '',
          'description': '',
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

  const handleVariantInput = (value, i) => {
    setCourseContent((prevState) => {
      let newState = [...prevState]
      newState[step - 1].variants[i] = value

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

  const handleExitCourse = () => {
    navigate("/react/my-profile/course-management");
  }

  const handleVariantDelete = (i) => {
    setCourseContent((prevState) => {
      let newState = [...prevState]
      newState[step - 1].variants.splice(i, 1)

      return newState
    })
  }

  const addVariant = () => {
    setCourseContent((prevState) => {
      let newState = [...prevState]
      newState[step - 1].variants.push('')

      return newState
    })
  }

  const handleDeleteStep = () => {
    setLoader(true)

    CourseElementRepository.delete(courseContent[step - 1]).then(
        () => {
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

  const getSqlMetaTypes = () => {
    const result = [];
    for(let key in metaTypes) {
      result.push({
        name: metaTypes[key],
        type: key
      });
    }
    return result;
  }

  const typeList = () => {
    return [
      {name: 'Текст', type: 'article'},
      {name: 'Практика Mysql', type: 'mysql'},
      {name: 'Практика Postgres', type: 'postgres'},
      {name: 'Практика SQL', type: 'sql'},
      {name: 'Открытый вопрос', type: 'open-question'},
    ];
  }

  console.log(courseContent[step - 1].metaType);

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
        {
          "sql" === courseContent[step - 1].type &&
            <Select
              value={courseContent[step - 1].metaType}
              onChange={(e) => handleInputChange(e.target.value, 'metaType')}
              sx={{minWidth: '150px'}}>
              {
                getSqlMetaTypes().map((item, i) => <MenuItem key={i} value={item.type}>{item.name}</MenuItem>)
              }
            </Select>
        }
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
        <TextField
            required
            id={`course-${step}`}
            type="text"
            variant="outlined"
            multiline={true}
            fullWidth={true}
            minRows={5}
            value={courseContent[step - 1].description}
            onChange={(e) => handleInputChange(e.target.value, 'description')}
        />
      </C.QuestionBlock>
      {isPractice(courseContent[step - 1].type) &&
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
            value={courseContent[step - 1].answer}
            onChange={(e) => handleInputChange(e.target.value, 'answer')}
          />
        </C.AnswerBlock>
      }
      {'open-question' === courseContent[step - 1].type &&
          <C.AnswerBlock>
            <H5>Введите правильный ответ</H5>
            <TextField
                required
                id={`course-${step}-2`}
                type="text"
                variant="outlined"
                multiline={true}
                fullWidth={true}
                minRows={5}
                value={courseContent[step - 1].answer}
                onChange={(e) => handleInputChange(e.target.value, 'answer')}
            />
          </C.AnswerBlock>
      }
      {courseContent[step - 1].type === 'poll' &&
        <C.VariantsBlock>
          <Button variant='contained' size='medium' onClick={addVariant}>Добавить вариант</Button>
          <C.VariantsRow>
            <RadioGroup
              name={`course-answer-group-${step}`}
              value={courseContent[step - 1]['right-variant']}
              onChange={(e) => handleInputChange(e.target.value, 'right-variant')}
              onClick={(e) => {
                if (e.target.value === courseContent[step - 1]['right-variant']) {
                  handleInputChange('', 'right-variant')
                }
              }}
            >
              {courseContent[step - 1].variants.map((item, i, arr) => {
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
                        endAdornment: arr.length > 2 ?
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => handleVariantDelete(i)}
                              edge="end"
                            >
                              <DeleteForeverRoundedIcon/>
                            </IconButton>
                          </InputAdornment>
                          :
                          '',
                      }}
                    />
                    <FormControlLabel
                      value={i + 1}
                      control={<Radio />}
                      label="Правильный ответ"
                      sx={{marginRight: 0}}
                    />
                  </C.Row>
                )
              })}
            </RadioGroup>
          </C.VariantsRow>
        </C.VariantsBlock>
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