import React, { useState, useEffect } from 'react';
import * as C from './styles'
import { H2, TextL } from '../../components/Typography'
import {CourseBlock} from "./CourseBlock/CourseBlock";
import {useOutletContext} from "react-router-dom";
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import CourseRepository from "./CourseRepository";
import {Button} from "@mui/material"

export const MyProfile = () => {
    const outletContent = useOutletContext();
    const useInfo = outletContent.userInfo;
    const [restartable, setRestartable] = useState(null);
    const [newCourses, setNewCourses] = useState(null);
    const [inProgress, setInProgress] = useState(null);
    const [completedCourses, setCompletedCourses] = useState(null);

    useEffect(() => {
      CourseRepository.getRestartable().then(setRestartable);
      CourseRepository.getNewCourses().then(setNewCourses);
      CourseRepository.getStartedCourses().then(setInProgress);
      CourseRepository.getCompletedCourses().then(setCompletedCourses);
    }, [])

    const linkToStatisticByStudent = (studentId) => {
        return `/react/my-profile/student-statistic?student=${studentId}`
    }

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
                            <Button variant='contained' size='medium'>Посмотреть другие курсы</Button>
                            <Button
                                variant="outlined"
                                size="medium"
                                target="_blank"
                                href={linkToStatisticByStudent(useInfo?.userId)}
                                underline="none"
                            >
                                Посмотреть свою подробную статистику
                            </Button>
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
                    id="restartable"
                    title="Можно пройти снова"
                    items={restartable}
                    mainButton="Начать прохождение"
                    resultButton=""
                    noCourseText="У вас нет курсов для прохождения"
                />
            </section>
            <section>
                <CourseBlock
                    id="new-courses"
                    title="Ожидают прохождения"
                    items={newCourses}
                    mainButton="Начать прохождение"
                    resultButton=""
                    noCourseText="У вас нет новых курсов для прохождения"
                />
            </section>
            <section>
                <CourseBlock
                    id='in-progress'
                    title="В процессе"
                    items={inProgress}
                    mainButton="Продолжить прохождение"
                    resultButton=""
                    noCourseText="У вас нет курсов в процессе прохождения"
                />
            </section>
            <section>
                <CourseBlock
                    id='completed-courses'
                    title="Завершённые"
                    items={completedCourses}
                    mainButton=""
                    resultButton="Результаты"
                    noCourseText="Вы пока не завершили ни один курс"
                />
            </section>
        </>
    )
}