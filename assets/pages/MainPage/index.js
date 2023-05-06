import React, { useState, useEffect } from 'react';
import * as C from './styles'
import { Popper, MenuItem, Divider, Grow, Paper, ClickAwayListener, MenuList } from "@mui/material";
import { TextM, TextL, H5 } from '../../components/Typography'
import { Logo } from "../../components/Logo";
import {Outlet, Link, useNavigate} from "react-router-dom";
import {HttpRequest} from "../../Service/HttpRequest";
import { hostName } from '../../config'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import {Loader} from "../../components/Loader";
import avatarImg from "../../img/catAvatar.png"
import {GetPermission} from '../../Service/AskPermission'
import useAuth from '../../hooks/useAuth'
import {TokenRepository} from "../../Repositories/tokenRepository";

export const MainPage = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const [anchorElMenu, setAnchorElMenu] = useState(null)
    const [userInfo, setUserInfo] = useState({})
    const [outletContent, setOutletContent] = useState({userInfo})
    const [menuOpen, setMenuOpen] = useState(false);
    const {setAuth} = useAuth();

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

        TokenRepository.delete((data) => {
            window.location.href = location.origin + '/react';
            localStorage.removeItem('jwtToken')
        })

        // HttpRequest.get(`${hostName}/api/logout`,(data) => handleResponse(data), (error) => handleResponse())
    }

    const handleProfileMenuClose = () => {
        setProfileMenuOpen(false)
    }

    const handleMenuClose = () => {
        setMenuOpen(false)
    }

    useEffect(() => {
        const handleSetUserInfo = (data) => {
            localStorage.setItem('appUserInfo', JSON.stringify(data));
            setUserInfo(data)
            setAuth({roles: data.roles})
        }

        if (localStorage.getItem('appUserInfo')) {
            handleSetUserInfo(JSON.parse(localStorage.getItem('appUserInfo')));
        }
        else {
            HttpRequest.get(`${hostName}/api/user/info`, (data) => handleSetUserInfo(data))
        }
    }, [])

    useEffect(() => {
        setOutletContent({userInfo})
    }, [userInfo])

    const menuItems = [
        {href: '/react/my-profile', name: 'Личный кабинет', roles: ['ROLE_USER']},
        {href: '/react/feedback-form', name: 'Обратная связь', roles: ['ROLE_USER']},
        {href: '/react/my-profile/course-management', name: 'Администрирование курсов', roles: ['ROLE_TEACHER', 'ROLE_ADMIN']},
        {href: '/react/my-profile/report', name: 'Результаты', roles: ['ROLE_TEACHER', 'ROLE_ADMIN']},
    ];

    const menuListItem = (item, key) => {
        return GetPermission(item.roles)
            && <MenuItem onClick={handleMenuClose} key={key}>
                <Link to={item.href}>{item.name}</Link>
            </MenuItem>
    }

    const navBarMenuItem = (item, key) => {
        return GetPermission(item.roles)
            && <Link to={item.href} key={key}>
                <TextL>{item.name}</TextL>
            </Link>
    }

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
                      <Grow {...TransitionProps}>
                        <Paper>
                          <ClickAwayListener onClickAway={handleMenuClose}>
                            <MenuList>
                              {
                                menuItems.map((item, key) => {
                                  return menuListItem(item, key)
                                })
                              }
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
                  {
                    menuItems.map((item, key) => {
                      return navBarMenuItem(item, key);
                    })
                  }
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
                                      <C.EmailWrapper>
                                          <TextL>{userInfo?.userIdentifier}</TextL>
                                      </C.EmailWrapper>
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