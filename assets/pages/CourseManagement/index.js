import React, { useState, useEffect } from 'react';
import * as C from './styles'
import { TextField } from "@mui/material";
import {Button} from "../../components/Button";
import {CourseBlock} from './CourseBlock'
import { TextM, TextL, TextS, H2, H3, H5 } from '../../components/Typography'
import {useNavigate} from "react-router-dom";
import {HttpRequest} from "../../Service/HttpRequest";

export const CourseManagement = () => {
  const navigate = useNavigate();
  const [courseList, setCourseList] = useState([])

  useEffect(() => {
    getCourseInf()
  }, [])

  const getCourseInf = () => {
    const handleSuccess = (data) => {
      setCourseList(data)
    }

    const handleError = () => {

    }

    HttpRequest.get('http://localhost/api-platform/courses', (data) => handleSuccess(data), (error) => handleError())
  }

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
            <CourseBlock
              items={courseList}
              getNewCourseList={getCourseInf}
              updateCourseList={() => setCourseList([])}
            />
        </C.CourseList>
      </C.Wrapper>
  )
}

