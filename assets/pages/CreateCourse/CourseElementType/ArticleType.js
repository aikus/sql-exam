import React from 'react';
import { Editor } from "react-draft-wysiwyg";
import { wysiwygConfig } from "/assets/config";
import { CourseElementTitleInput } from "./Component/CourseElementTitleInput";
import {Box} from "@mui/material";

export const ArticleType = ({step, courseElement, handleInputChange}) => {
    return <>
        <CourseElementTitleInput
            label={'Введите заголовок'}
            step={step}
            value={courseElement.name}
            onChange={(e) => handleInputChange(e.target.value, 'name')}
        />
        <Box>
            <p>Введите текст</p>
            <Editor
                id={`course-${step}`}
                editorState={courseElement.description}
                editorClassName='wysiwyg-editor'
                toolbarClassName='wysiwyg-toolbar'
                toolbar={wysiwygConfig}
                onEditorStateChange={(e) => handleInputChange(e, 'description')}
            />
        </Box>
    </>
}