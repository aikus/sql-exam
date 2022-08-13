import React, { useState } from 'react';
import * as C from './styles'
import { Menu, MenuItem } from "@mui/material";
import { Logo } from "../../components/Logo";
import { MyProfile } from './MyProfile/MyProfile'
import { CourseBlock } from './CourseBlock/CourseBlock'

export const PersonalAccountPage = () => {
    const courseInProgress = {
        header: 'В процессе',
        link: '#',
        items: [
            {
                title: 'Курс какой-то там чего-то там',
                description: 'Описание курса чего-то там',
            },
            {
                title: 'Курс какой-то там чего-то там',
                description: 'Описание курса чего-то там',
            },
            {
                title: 'Курс какой-то там чего-то там',
                description: 'Описание курса чего-то там',
            },
            {
                title: 'Курс какой-то там чего-то там',
                description: 'Описание курса чего-то там',
            }
        ]
    }

    const courseWaiting = {
        header: 'Ожидают прохождения',
        link: '#',
        items: [
            {
                title: 'Курс какой-то там чего-то там',
                description: 'Описание курса чего-то там',
                linkToStart: '#'
            },
            {
                title: 'Курс какой-то там чего-то там',
                description: 'Описание курса чего-то там',
                linkToStart: '#'
            },
            {
                title: 'Курс какой-то там чего-то там',
                description: 'Описание курса чего-то там',
                linkToStart: '#'
            },
            {
                title: 'Курс какой-то там чего-то там',
                description: 'Описание курса чего-то там',
                linkToStart: '#'
            }
        ]
    }

    const courseFinished = {
        header: 'Завершенные курсы',
        link: '#',
        items: [
            {
                title: 'Курс какой-то там чего-то там',
                description: 'Описание курса чего-то там',
            },
            {
                title: 'Курс какой-то там чего-то там',
                description: 'Описание курса чего-то там',
            },
            {
                title: 'Курс какой-то там чего-то там',
                description: 'Описание курса чего-то там',
            },
            {
                title: 'Курс какой-то там чего-то там',
                description: 'Описание курса чего-то там',
            }
        ]
    }

    return (
        <C.Wrapper>
            <C.NavBar>
                <Logo/>
                <C.NavBarItemsBox>
                    <C.NavBarItem>File</C.NavBarItem>
                    <C.NavBarItem>Edit</C.NavBarItem>
                    <C.NavBarItem>View</C.NavBarItem>
                    <C.NavBarItem>Help</C.NavBarItem>
                </C.NavBarItemsBox>
            </C.NavBar>
            <section>
                <MyProfile/>
            </section>
            <section>
                <CourseBlock
                    id={'in-progress'}
                    header={courseInProgress.header}
                    link={courseInProgress.link}
                    items={courseInProgress.items}
                />
            </section>
            <section>
                <CourseBlock
                    id={'waiting'}
                    header={courseWaiting.header}
                    link={courseWaiting.link}
                    items={courseWaiting.items}
                />
            </section>
            <section>
                <CourseBlock
                    id={'finished'}
                    header={courseFinished.header}
                    link={courseFinished.link}
                    items={courseFinished.items}
                />
            </section>
        </C.Wrapper>
    )
}

