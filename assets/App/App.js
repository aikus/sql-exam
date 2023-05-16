import React, { useEffect } from 'react';
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
import { FeedbackForm } from "../pages/FeedbackForm";
import { TextPageTemplate } from "../Tamplate/TextPageTemplate";
import {UrlService} from "../Service/UrlService";
import prtScrnImg from './printScreenImg.png';

export const App = () => {
  const onKeyUp = e => {
    const course = UrlService.param('course');

    if (course && e.keyCode === 44) {
      sendUserData();
      putImgToClipboard();
    }
  };

  const sendUserData = () => {
    console.log('screen')
    console.log(localStorage.getItem('userId'));
    console.log(localStorage.getItem('courseId'));
    console.log(localStorage.getItem('stepId'));
    console.log(new Date())
    console.log(navigator.userAgent)
  }

  const putImgToClipboard = async () => {
    const data = await fetch(prtScrnImg);
    const blob = await data.blob();

    if (navigator.clipboard) {
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
    }
  }

  useEffect(() => {
    window.addEventListener('keyup', onKeyUp);

    return () => {
      window.removeEventListener('keyup', onKeyUp);
    };
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/react/" element={<Authorization/>}/>
              <Route path="/react">
                <Route path="feedback-form" element={<TextPageTemplate><FeedbackForm /></TextPageTemplate>}/>
              </Route>
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