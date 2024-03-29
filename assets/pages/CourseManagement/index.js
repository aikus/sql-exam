import React, { useState, useEffect } from 'react';
import * as C from './styles'
import { TextField, Button } from "@mui/material";
import {CourseBlock} from './CourseBlock'
import { TextM, TextL, TextS, H2, H3, H5 } from '../../components/Typography'
import {useNavigate} from "react-router-dom";
import {HttpRequest} from "../../Service/HttpRequest";
import { hostName } from '../../config'

export const CourseManagement = () => {
  const navigate = useNavigate();
  const [courseList, setCourseList] = useState(null)

  useEffect(() => {
    getCourseInf()
  }, [])

  const getCourseInf = () => {
    const handleSuccess = (data) => {
      setCourseList(data)
    }

    const handleError = () => {

    }

    HttpRequest.get(`${hostName}/api-platform/courses`, (data) => handleSuccess(data), (error) => handleError())
  }

  return (
      <C.Wrapper>
        <H2>Администрирование курсов</H2>
        <C.CreateCourse>
            <Button
              variant='contained'
              size='large'
              onClick={() => {
                navigate("/react/my-profile/create-course")
              }}
            >Создать новый курс</Button>
        </C.CreateCourse>
        <C.CourseList>
            <H3>Список курсов</H3>
            <CourseBlock
              items={courseList}
              getNewCourseList={getCourseInf}
              updateCourseList={() => setCourseList(null)}
            />
        </C.CourseList>
      </C.Wrapper>
  )
}

