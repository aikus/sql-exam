import React from 'react';
import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Authorization } from "../pages/Authorization/Authorization"
import { PersonalAccountPage } from "../pages/PersonalAccountPage/PersonalAccountPage"
import {Practice} from "../pages/Practice/Practice";
import {Questionnaire} from "../pages/Questionnaire";

export const App = () => {
    return (
        <>
            {/*<BrowserRouter>*/}
            {/*    <Routes>*/}
            {/*        <Route path="/react/" element={<Authorization/>}/>*/}
            {/*        <Route path="/react/my-profile" element={<PersonalAccountPage/>}/>*/}
            {/*        <Route path="/react/my-profile/practice" element={<Practice/>}/>*/}
            {/*    </Routes>*/}
            {/*</BrowserRouter>*/}
            <Questionnaire/>
        </>
    )
}