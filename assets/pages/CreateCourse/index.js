import React, { useState, useEffect } from 'react';
import * as C from './styles'
import { TextField, OutlinedInput, MenuItem, Select, ListItemText, Checkbox, FormControlLabel } from "@mui/material";
import {Button} from "../../components/Button";
import { TextM, TextL, TextS, H2, H3, H5 } from '../../components/Typography'
import {useNavigate} from "react-router-dom";

export const CreateCourse = () => {
  const [courseInfo, setCourseInfo] = useState({
    name: '',
    description: '',
    intendedFor: [],
    exam: false,
    numOfTries: '',
    minForTrie: ''
  })

  const handleIntendedForChange = (event) => {
    const {
      target: { value },
    } = event;
    setCourseInfo(prevState => ({...prevState, intendedFor: typeof value === 'string' ? value.split(',') : value}));
  };

  const handleExamChange = (event) => {
    setCourseInfo(prevState => ({...prevState, exam: event.target.checked}));
  };

  return (
      <C.Wrapper>
        <H2>Создание нового курса</H2>
        <C.Main>
          <C.FieldBox>
            <H5>Название курса</H5>
            <TextField
              required
              type="text"
              multiline={true}
              fullWidth={true}
              value={courseInfo.name}
              onChange={(e) => {
                setCourseInfo((prevState) => ({...prevState, name: e.target.value}))
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
              value={courseInfo.description}
              onChange={(e) => {
                setCourseInfo((prevState) => ({...prevState, description: e.target.value}))
              }}
            />
          </C.FieldBox>
          <C.FieldBox>
            <H5>Принадлежность</H5>
            <Select
              multiple
              displayEmpty
              value={courseInfo.intendedFor}
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
                  <Checkbox checked={courseInfo.intendedFor.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </C.FieldBox>
          <C.CheckBoxWrapper>
            <FormControlLabel control={<Checkbox checked={courseInfo.exam} onChange={handleExamChange}/>} label="Экзамен" />
            <TextM>При нажатии на чекбокс, выставляется ограничение по времени и количеству попыток прохождения</TextM>
          </C.CheckBoxWrapper>
          {courseInfo.exam &&
            <C.CheckBoxControled>
              <C.FieldBox>
                <H5>Количество попыток</H5>
                <TextField
                  required
                  type="number"
                  value={courseInfo.numOfTries}
                  onChange={(e) => {
                    setCourseInfo((prevState) => ({...prevState, numOfTries: e.target.value}))
                  }}
                />
              </C.FieldBox>
              <C.FieldBox>
                <H5>Время на одну попытку в минутах</H5>
                <TextField
                  required
                  type="number"
                  value={courseInfo.minForTrie}
                  onChange={(e) => {
                    setCourseInfo((prevState) => ({...prevState, minForTrie: e.target.value}))
                  }}
                />
              </C.FieldBox>
            </C.CheckBoxControled>
          }
          <Button>Далее</Button>
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
