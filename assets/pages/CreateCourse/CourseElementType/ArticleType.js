import React from 'react';
import { Editor } from "react-draft-wysiwyg";
import { wysiwygConfig } from "/assets/config";
import { CourseElementTitleInput } from "./Component/CourseElementTitleInput";
import { Box, Typography } from "@mui/material";

export const ArticleType = ({step, courseElement, handleInputChange}) => {
    return <>
        <CourseElementTitleInput
            label={'Введите заголовок'}
            step={step}
            value={courseElement.name}
            onChange={(e) => handleInputChange(e.target.value, 'name')}
        />
        <Box>
            <Typography sx={{my: 1}}>Введите текст</Typography>
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