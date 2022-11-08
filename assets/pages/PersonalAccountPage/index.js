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
import {Loader} from "../../components/Loader";
import avatarImg from "../../img/catAvatar.png"

export const PersonalAccountPage = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [inProgress, setInProgress] = useState([])
    const [profileMenuOpen, setProfileMenuOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const [userInfo, setUserInfo] = useState({})
    const [outletContent, setOutletContent] = useState({inProgress, userInfo})

    const handleProfileMenuClick = (e) => {
        setAnchorEl(e.currentTarget);
        setProfileMenuOpen((prevState) => (!prevState))
    }

    const handleLogout = () => {
        handleProfileMenuClose()
        setLoader(true)

        const handleResponse = (data) => {
            console.log(111)
            console.log('data: ', data)
            setLoader(false)
        }

        HttpRequest.get(`${hostName}/api/logout`,(data) => handleResponse(data), (error) => handleResponse())
    }

    const handleProfileMenuClose = () => {
        setProfileMenuOpen(false)
    }

    useEffect(() => {
        if (inProgress.length === 0) {
            const handleSuccess = (data) => {
                setInProgress(data)
            }

            const handleSetUserInfo = (data) => {
                setUserInfo(data)
            }

            HttpRequest.get(`${hostName}/api-platform/courses`, (data) => handleSuccess(data))
            HttpRequest.get(`${hostName}/api/user/info`, (data) => handleSetUserInfo(data))
        }
    }, [])

    useEffect(() => {
        setOutletContent({inProgress, userInfo})
    }, [inProgress, userInfo])

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
                    <C.Avatar><img src={avatarImg} alt="аватар профиля"/></C.Avatar>
                    <ArrowDropDownIcon/>
                </C.MenuBlock>
                <Menu
                  anchorEl={anchorEl}
                  open={profileMenuOpen}
                  onClose={handleProfileMenuClose}
                >
                    <TextL>{userInfo?.userIdentifier}</TextL>
                    <MenuItem onClick={handleLogout}>Выход</MenuItem>
                </Menu>
            </C.NavBar>
            <Outlet context={outletContent}/>
            <Loader show={loader}/>
        </C.Wrapper>
    )
}