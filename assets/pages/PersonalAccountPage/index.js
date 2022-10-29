import React, { useState, useEffect } from 'react';
import * as C from './styles'
import { Menu, MenuItem } from "@mui/material";
import { TextM, TextL, H5 } from '../../components/Typography'
import { Logo } from "../../components/Logo";
import { MyProfile } from '../MyProfile'
import { CourseBlock } from '../MyProfile/CourseBlock/CourseBlock'
import {Outlet, Link, useNavigate} from "react-router-dom";
import {HttpRequest} from "../../Service/HttpRequest";
import { hostName } from '../../config'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export const PersonalAccountPage = () => {
    const navigate = useNavigate();

    const [inProgress, setInProgress] = useState([])
    const [profileMenuOpen, setProfileMenuOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)

    const handleProfileMenuClick = (e) => {
        setAnchorEl(e.currentTarget);
        setProfileMenuOpen((prevState) => (!prevState))
    }

    useEffect(() => {
        if (inProgress.length === 0) {
            const handleSuccess = (data) => {
                setInProgress(data)
            }

            HttpRequest.get(`${hostName}/api-platform/courses`, (data) => handleSuccess(data),)
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
                    <Link to=""><TextL>Личный кабинет</TextL></Link>
                    <Link to="course-management"><TextL>Администрирование курсов</TextL></Link>
                </C.NavBarItemsBox>
                <C.MenuBlock
                  onClick={handleProfileMenuClick}
                >
                    <C.Avatar><TextM>T</TextM></C.Avatar>
                    <ArrowDropDownIcon/>
                </C.MenuBlock>
                <Menu
                  anchorEl={anchorEl}
                  open={profileMenuOpen}
                  onClose={() => setProfileMenuOpen(false)}
                >
                    <MenuItem>Выход</MenuItem>
                </Menu>
            </C.NavBar>
            <Outlet context={inProgress}/>
        </C.Wrapper>
    )
}