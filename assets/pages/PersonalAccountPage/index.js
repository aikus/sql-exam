import React, { useState, useEffect } from 'react';
import * as C from './styles'
import { Menu, MenuItem } from "@mui/material";
import { Logo } from "../../components/Logo";
import { MyProfile } from '../MyProfile'
import { CourseBlock } from '../MyProfile/CourseBlock/CourseBlock'
import {Outlet, Link, useNavigate} from "react-router-dom";

export const PersonalAccountPage = () => {
    const navigate = useNavigate();

    const [inProgress, setInProgress] = useState([])

    useEffect(() => {
        console.log('inProgress: ', inProgress)
        if (Object.keys(inProgress).length === 0) {
            fetch('http://localhost/api-platform/exams', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.code === 401) {
                        return
                    }
                    setInProgress(data['hydra:member'])
                })
        }
    }, [])

    return (
        <C.Wrapper>
            <C.NavBar>
                <Logo onClick={() => {
                    navigate("/react/my-profile")
                }}/>
                <C.NavBarItemsBox>
                    <C.NavBarItem><Link to="questionnaire">Форма опросника PR</Link></C.NavBarItem>
                    <C.NavBarItem>File</C.NavBarItem>
                    <C.NavBarItem>Edit</C.NavBarItem>
                    <C.NavBarItem>View</C.NavBarItem>
                    <C.NavBarItem>Help</C.NavBarItem>
                </C.NavBarItemsBox>
            </C.NavBar>
            <Outlet context={inProgress}/>
        </C.Wrapper>
    )
}