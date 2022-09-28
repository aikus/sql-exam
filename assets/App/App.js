import React from 'react';
import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Authorization } from "../pages/Authorization/Authorization"
import { PersonalAccountPage } from "../pages/PersonalAccountPage"
import {Practice} from "../pages/Practice";
import {Questionnaire} from "../pages/Questionnaire";
import {MyProfile} from "../pages/MyProfile";

export const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/react/" element={<Authorization/>}/>
                    <Route path="/react/my-profile" element={<PersonalAccountPage/>}>
                        <Route index element={<MyProfile/>}/>
                        <Route path="practice" element={<Practice/>}/>
                        <Route path="questionnaire" element={<Questionnaire/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}