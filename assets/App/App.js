import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Authorization } from "../pages/Authorization/Authorization"
import { MainPage } from "../pages/MainPage"
import { Practice } from "../pages/Practice";
import { Questionnaire } from "../pages/Questionnaire";
import { MyProfile } from "../pages/MyProfile";
import { CourseManagement } from "../pages/CourseManagement";
import { CreateCourse } from "../pages/CreateCourse";
import { ThemeProvider } from "@mui/material";
import { theme } from './theme';
import {ProtectedRoute} from "../components/ProtectedRoute";
import { PersonalCourseResult } from "../pages/PersonalCourseResult";

export const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/react/" element={<Authorization/>}/>
            <Route path="/react/my-profile" element={<MainPage/>}>
              <Route index element={<MyProfile/>}/>
              <Route path="practice" element={<Practice/>}/>
              <Route path="questionnaire" element={<Questionnaire/>}/>
              <Route element={<ProtectedRoute allowedRoles={['ROLE_TEACHER', 'ROLE_ADMIN']}/>}>
                <Route path="course-management" element={<CourseManagement/>}/>
              </Route>
              <Route element={<ProtectedRoute allowedRoles={['ROLE_TEACHER', 'ROLE_ADMIN']}/>}>
                <Route path="create-course" element={<CreateCourse/>}/>
              </Route>
              <Route path="course-result" element={<PersonalCourseResult/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}