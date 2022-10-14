import React, { useState, useEffect } from 'react';
import * as C from './styles'
import { Menu, MenuItem } from "@mui/material";
import { TextM, TextL, H5 } from '../../components/Typography'
import { Logo } from "../../components/Logo";
import { MyProfile } from '../MyProfile'
import { CourseBlock } from '../MyProfile/CourseBlock/CourseBlock'
import {Outlet, Link, useNavigate} from "react-router-dom";

export const PersonalAccountPage = () => {
    const navigate = useNavigate();

    const [inProgress, setInProgress] = useState([])

    useEffect(() => {
        if (Object.keys(inProgress).length === 0) {
            fetch('http://localhost/api-platform/courses', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log('data PersonalAccountPage: ', data)
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
                <C.LogoBlock
                    onClick={() => {
                        navigate("/react/my-profile")
                    }}
                >
                    <Logo />
                    <H5>Scirpus</H5>
                </C.LogoBlock>
                <C.NavBarItemsBox>
                    <Link to="questionnaire"><TextL>Форма опросника PR</TextL></Link>
                    <Link to="course-management"><TextL>Администрирование курсов</TextL></Link>
                </C.NavBarItemsBox>
                {/*<C.ProfileInfo>*/}
                {/*    <TextL>slumz@yandex.ru</TextL>*/}
                {/*    <C.Logout><TextL>Выйти</TextL></C.Logout>*/}
                {/*</C.ProfileInfo>*/}
            </C.NavBar>
            <Outlet context={inProgress}/>
        </C.Wrapper>
    )
}