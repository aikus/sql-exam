import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Authorization } from "../pages/Authorization/Authorization"
import { MainPage } from "../pages/MainPage"
import { Practice } from "../pages/Practice";
import { Questionnaire } from "../pages/Questionnaire";
import { MyProfile } from "../pages/MyProfile";
import { CourseManagement } from "../pages/CourseManagement";
import { CreateCourse } from "../pages/CreateCourse";
import { ThemeProvider } from "@mui/styles";
import { theme } from './theme';
import {ProtectedRoutes} from '../Service/Auth'

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
              <Route path="course-management" element={ProtectedRoutes(<CourseManagement/>, ['ROLE_TEACHER', 'ROLE_ADMIN'])}/>
              <Route path="create-course" element={ProtectedRoutes(<CreateCourse/>, ['ROLE_TEACHER', 'ROLE_ADMIN'])}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}