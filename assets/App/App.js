import React from 'react';
import { Box } from "@mui/material";
import { Authorization } from "../pages/Authorization/Authorization"
import { PersonalAccountPage } from "../pages/PersonalAccountPage/PersonalAccountPage"
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/react/" element={<Authorization/>}/>
                    <Route path="/react/my-profile" element={<PersonalAccountPage/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}