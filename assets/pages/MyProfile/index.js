import React, { useState } from 'react';
import * as C from './styles'
import {Button} from "../../components/Button";
import { H2, TextL } from '../../components/Typography'
import {CourseBlock} from "./CourseBlock/CourseBlock";
import {useOutletContext} from "react-router-dom";

export const MyProfile = () => {
    const inProgress = useOutletContext()

    return (
        <>
            <section>
                <H2>Мой профиль</H2>
                <C.MyProfileBox>
                    <C.MyProfile>
                        <C.Text>
                            <TextL>Привет, username</TextL>
                            <TextL>Добро пожаловать в твой личный кабинет в специальном образовательном ресурсе Scirpus.</TextL>
                            <TextL>Здесь ты можешь посмотреть свой рейтинг и курсы</TextL>
                        </C.Text>
                        <C.ButtonBox>
                            <Button>Посмотреть другие курсы</Button>
                            <Button>Посмотреть свою подробную статистику</Button>
                        </C.ButtonBox>
                    </C.MyProfile>
                </C.MyProfileBox>
            </section>
            <section>
                {Object.keys(inProgress).length !== 0 &&
                    <CourseBlock
                        id={'in-progress'}
                        items={inProgress}
                    />
                }
            </section>
            {/*<section>*/}
            {/*    <CourseBlock*/}
            {/*        id={'waiting'}*/}
            {/*        header={courseWaiting.header}*/}
            {/*        link={courseWaiting.link}*/}
            {/*        items={courseWaiting.items}*/}
            {/*    />*/}
            {/*</section>*/}
            {/*<section>*/}
            {/*    <CourseBlock*/}
            {/*        id={'finished'}*/}
            {/*        header={courseFinished.header}*/}
            {/*        link={courseFinished.link}*/}
            {/*        items={courseFinished.items}*/}
            {/*    />*/}
            {/*</section>*/}

        </>
    )
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