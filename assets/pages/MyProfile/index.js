import React, { useState } from 'react';
import * as C from './styles'
import { H2, TextL } from '../../components/Typography'
import {CourseBlock} from "./CourseBlock/CourseBlock";
import {useOutletContext} from "react-router-dom";
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import {Button} from "@mui/material"
import MUIEditor, { MUIEditorState, toHTML } from "react-mui-draft-wysiwyg";
import * as DOMPurify from 'dompurify';

export const MyProfile = () => {
    const outletContent = useOutletContext();
    const useInfo = outletContent.userInfo;
    const editorConfig = {}
    const [editorState, setEditorState] = React.useState(
      MUIEditorState.createEmpty(editorConfig),
    )
    const [html, setHtml] = React.useState('');


    // const { highlight } = require('sql-highlight')
    // const sqlString = "SELECT `id`, `username` FROM `users` WHERE `email` = 'test@example.com'"
    // const highlighted = highlight(sqlString, {
    //   html: true,
    // })

    const onChange = newState => {
        setEditorState(newState)
    }

    const convertToHTML = () => {
      const stateHtml = toHTML(editorState.getCurrentContent())
      setHtml(stateHtml)
    }

    const sanitizer = DOMPurify.sanitize;

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
                            <Button
                                variant="contained"
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
                  title="Ваши курсы"
              />
            </section>
            <MUIEditor editorState={editorState} onChange={onChange} value={'text'}/>
            <div onClick={() => {
                convertToHTML()
            }}>GGG</div>
            <div dangerouslySetInnerHTML={{__html: sanitizer(html)}} />
        </>
    )
}