import React, { useState, useEffect } from 'react';
import * as C from './styles'
import { TextField } from "@mui/material";
import {Button} from "../../components/Button";
import {CourseBlock} from './CourseBlock'
import { TextM, TextL, TextS, H2, H3, H5 } from '../../components/Typography'
import {useNavigate} from "react-router-dom";

export const CourseManagement = () => {
  const navigate = useNavigate();

  return (
      <C.Wrapper>
        <H2>Администрирование курсов</H2>
        <C.CreateCourse>
            <Button onClick={() => {
                navigate("/react/my-profile/create-course")
            }}>Создать новый курс</Button>
        </C.CreateCourse>
        <C.CourseList>
            <H3>Список курсов</H3>
            <CourseBlock items={data}/>
        </C.CourseList>
      </C.Wrapper>
  )
}

const data = [
  {
      'title': 'Курс какой-то там чего-то там',
      'description': 'Описание курса чего-то там'
  },
  {
    'title': 'Курс какой-то там чего-то там',
    'description': 'Описание курса чего-то там'
  },
  {
    'title': 'Курс какой-то там чего-то там',
    'description': 'Описание курса чего-то там'
  }
]


