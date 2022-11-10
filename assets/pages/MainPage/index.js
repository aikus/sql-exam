import React, { useState, useEffect } from 'react';
import * as C from './styles'
import { Popper, MenuItem, Divider, Grow, Paper, ClickAwayListener, MenuList } from "@mui/material";
import { TextM, TextL, H5 } from '../../components/Typography'
import { Logo } from "../../components/Logo";
import { MyProfile } from '../MyProfile'
import { CourseBlock } from '../MyProfile/CourseBlock/CourseBlock'
import {Outlet, Link, useNavigate} from "react-router-dom";
import {HttpRequest} from "../../Service/HttpRequest";
import { hostName } from '../../config'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import {Loader} from "../../components/Loader";
import avatarImg from "../../img/catAvatar.png"

export const MainPage = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [inProgress, setInProgress] = useState([])
    const [profileMenuOpen, setProfileMenuOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const [anchorElMenu, setAnchorElMenu] = useState(null)
    const [userInfo, setUserInfo] = useState({})
    const [outletContent, setOutletContent] = useState({inProgress, userInfo})
    const [menuOpen, setMenuOpen] = useState(false);

    const handleProfileMenuClick = (e) => {
        setAnchorEl(e.currentTarget);
        setProfileMenuOpen((prevState) => (!prevState))
    }

    const handleMenuClick = (e) => {
        setAnchorElMenu(e.currentTarget);
        setMenuOpen((prevState) => (!prevState))
    }

    const handleLogout = () => {
        handleProfileMenuClose()
        setLoader(true)

        const handleResponse = (data) => {
            window.location.href = location.origin + '/react';
            localStorage.removeItem('jwtToken')
        }

        HttpRequest.get(`${hostName}/api/logout`,(data) => handleResponse(data), (error) => handleResponse())
    }

    const handleProfileMenuClose = () => {
        setProfileMenuOpen(false)
    }

    const handleMenuClose = () => {
        setMenuOpen(false)
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
                <C.MobileMenu>
                    <MenuOutlinedIcon sx={{marginLeft: '8px'}} fontSize={'large'} onClick={handleMenuClick}/>
                    <Popper
                      open={menuOpen}
                      anchorEl={anchorElMenu}
                      placement="bottom-start"
                      transition
                      disablePortal
                    >
                        {({ TransitionProps, placement }) => (
                          <Grow
                            {...TransitionProps}
                          >
                              <Paper>
                                  <ClickAwayListener onClickAway={handleMenuClose}>
                                      <MenuList>
                                          <MenuItem onClick={handleMenuClose}><Link to="">Личный кабинет</Link></MenuItem>
                                          <MenuItem onClick={handleMenuClose}><Link to="course-management">Администрирование курсов</Link></MenuItem>
                                      </MenuList>
                                  </ClickAwayListener>
                              </Paper>
                          </Grow>
                        )}
                    </Popper>
                </C.MobileMenu>
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
                <C.ProfileBlock
                  onClick={handleProfileMenuClick}
                >
                    <C.Avatar><img src={avatarImg} alt="аватар профиля"/></C.Avatar>
                    <ArrowDropDownIcon sx={{transition: '0.25s'}} className={profileMenuOpen ? 'profile-arrow-up' : ''}/>
                </C.ProfileBlock>
                <Popper
                  open={profileMenuOpen}
                  anchorEl={anchorEl}
                  placement="bottom-end"
                  transition
                  disablePortal
                >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                      >
                          <Paper>
                              <ClickAwayListener onClickAway={handleProfileMenuClose}>
                                  <MenuList>
                                      <MenuItem disabled={true}>
                                          {userInfo?.userIdentifier}
                                      </MenuItem>
                                      <Divider sx={{margin: '8px 0'}}/>
                                      <MenuItem onClick={handleLogout}>
                                          <LogoutOutlinedIcon sx={{marginRight: '8px'}}/>Выход
                                      </MenuItem>
                                  </MenuList>
                              </ClickAwayListener>
                          </Paper>
                      </Grow>
                    )}
                </Popper>
            </C.NavBar>
            <Outlet context={outletContent}/>
            <Loader show={loader}/>
        </C.Wrapper>
    )
}