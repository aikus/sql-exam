import React, { useState } from 'react';
import * as C from './styles'
import {Button} from "../../components/Button";
import { H2, TextL, TextM } from '../../components/Typography'
import {CourseBlock} from "./CourseBlock/CourseBlock";
import {useOutletContext} from "react-router-dom";
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';

export const MyProfile = () => {
    const outletContent = useOutletContext(),
        newCurses = outletContent.newCurses,
        inProgress = outletContent.inProgress,
        completedCourses = outletContent.completedCourses,
        useInfo = outletContent.userInfo
    console.log(outletContent);

    return (
        <>
            <section>
                <H2>Мой профиль</H2>
                <C.MyProfileBox>
                    <C.MyProfile>
                        <C.Text>
                            {useInfo?.userFio ?
                              <TextL>Здравствуйте, {useInfo?.userFio}</TextL>
                              :
                              <TextL>Привет!</TextL>
                            }
                            <TextL>Добро пожаловать в твой личный кабинет в специальном образовательном ресурсе Scirpus.</TextL>
                            <TextL>Здесь ты можешь посмотреть свой рейтинг и курсы</TextL>
                        </C.Text>
                        <C.ButtonBox>
                            <Button size={'S'}>Посмотреть другие курсы</Button>
                            <Button size={'S'}>Посмотреть свою подробную статистику</Button>
                        </C.ButtonBox>
                    </C.MyProfile>
                    <C.Rating>
                        <TextL>Рейтинг и курсы в&nbsp;разработке</TextL>
                        <SettingsSuggestOutlinedIcon fontSize={'large'}/>
                    </C.Rating>
                </C.MyProfileBox>
            </section>
            <section>
                <CourseBlock
                    id={'in-progress'}
                    title={"В процессе"}
                    items={inProgress}
                    mainButton={"Продолжить прохождение"}
                    resultButton={""}
                />
            </section>
            <section>
                <CourseBlock
                    id={'new-courses'}
                    title={"Ожидают прохождения"}
                    items={newCurses}
                    mainButton={"Начать прохождение"}
                    resultButton={""}
                />
            </section>
            <section>
                <CourseBlock
                    id={'completed-courses'}
                    title={"Завершённые"}
                    items={completedCourses}
                    mainButton={""}
                    resultButton={"Результаты"}
                />
            </section>
        </>
    )
}