import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Box,
    Container,
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Menu,
    Tooltip,
    MenuItem, MenuList, Link
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import useAuth from '/assets/hooks/useAuth'
import * as C from "/assets/pages/MainPage/styles";
import { UserRepository } from "/assets/Repositories/UserRpository";
import { TokenRepository } from "/assets/Repositories/tokenRepository";
import { Logo } from "/assets/Tamplate/Logo";
import { GetPermission } from "/assets/Service/AskPermission";
import { ScirpusAvatar } from "/assets/Tamplate/Nav/ScirpusAvatar";
import { TextL } from "/assets/components/Typography";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const navItems = [
    {href: '/react/my-profile', name: 'Личный кабинет', roles: ['ROLE_USER']},
    {href: '/react/feedback-form', name: 'Обратная связь', roles: ['ROLE_USER']},
    {href: '/react/my-profile/course-management', name: 'Администрирование курсов', roles: ['ROLE_TEACHER', 'ROLE_ADMIN']},
    {href: '/react/my-profile/report', name: 'Результаты', roles: ['ROLE_TEACHER', 'ROLE_ADMIN']},
];

const drawerWidth = 240;
const desktopVersion = 'desktop';
const mobileVersion = 'mobile';

export const MainMenu = ({windowDom, loader, setLoader}) => {
    const [user, setUser] = useState(null)
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const {setAuth} = useAuth();

    const container = windowDom !== undefined ? () => windowDom().document.body : undefined;

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    /** @returns {Promise<User>} */
    const requestUser = async () => {
        return await UserRepository.getUserInfo();
    }

    const handleLogout = () => {
        setLoader(true)

        TokenRepository.delete((data) => {
            window.location.href = location.origin + '/react';
            localStorage.removeItem('jwtToken')
        })
    }

    const renderMenuItem = (item, key, version) => {
        return GetPermission(item.roles) && (
            version === mobileVersion
                ? <ListItem key={key} disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <ListItemText primary={item.name} />
                    </ListItemButton>
                </ListItem>
                : <MenuItem key={key}>
                    <Link
                        color={"#262626"}
                        underline={"none"}
                        href={item.href}
                        key={key}
                    >{item.name}</Link>
                </MenuItem>
        )
    }

    useEffect(() => {
        requestUser().then(user => {
            setUser(user)
            setAuth({roles: user.roles})
        })
    }, [])

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Logo variant={'mobileMainMenu'}/>
            <Divider />
            <MenuList>
                {navItems.map((item, key) => (
                    renderMenuItem(item, key, mobileVersion)
                ))}
            </MenuList>
        </Box>
    );

    return (
        <>
            <AppBar component="nav" color="appBar" position={"fixed"}>
                <Container>
                    <Toolbar
                        disableGutters
                        sx={{
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}
                    >
                        <IconButton
                            color="inherit"
                            aria-label="Открыть меню"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { md: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Box>
                            <Logo variant={'desktopMainMenu'}/>
                        </Box>
                        <Box sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
                            {navItems.map((item, key) => (
                                renderMenuItem(item, key, desktopVersion)
                            ))}
                        </Box>
                        <Box
                            sx={{display: 'block'}}
                        >
                            <Tooltip title="Профиль">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <ScirpusAvatar />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '2.5rem' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <C.EmailWrapper>
                                    <TextL>{user?.email}</TextL>
                                </C.EmailWrapper>
                                <Divider sx={{margin: '8px 0'}}/>
                                <MenuItem onClick={handleLogout}>
                                    <LogoutOutlinedIcon sx={{marginRight: '8px'}}/>
                                    <Typography>Выход</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'flex', sm: 'flex', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </>
    )
}