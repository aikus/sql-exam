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
import { ReportByStudent } from "../pages/ReportByStudent";
import { Report } from "../pages/Report";
import {AuthProvider} from "../context/AuthProvider";
import { StatisticPage } from "/assets/pages/StatisticPage";
import { StudentStatisticPage } from "../pages/StudentStatisticPage";
import {CheckAnswer} from "../pages/CheckAnswer";

export const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthProvider>
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
                <Route element={<ProtectedRoute allowedRoles={['ROLE_TEACHER', 'ROLE_ADMIN']}/>}>
                  <Route path="report" element={<Report/>}/>
                </Route>
                <Route element={<ProtectedRoute allowedRoles={['ROLE_TEACHER', 'ROLE_ADMIN']}/>}>
                  <Route path="statistic" element={<StatisticPage/>}/>
                </Route>
                <Route element={<ProtectedRoute allowedRoles={['ROLE_TEACHER', 'ROLE_ADMIN']}/>}>
                  <Route path="check-answer" element={<CheckAnswer/>}/>
                </Route>
                <Route path="student-result" element={<ReportByStudent/>}/>
                <Route path="student-statistic" element={<StudentStatisticPage/>}/>
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}