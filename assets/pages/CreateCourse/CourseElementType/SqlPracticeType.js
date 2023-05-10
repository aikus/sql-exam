import React, {useRef} from 'react';
import { Editor } from "react-draft-wysiwyg";
import { wysiwygConfig } from "/assets/config";
import { SyntaxHighlightingField } from "/assets/components/SyntaxHighlightingField";
import { CourseElementTitleInput } from "./Component/CourseElementTitleInput";
import {Box} from "@mui/material";

export const SqlPracticeType = ({step, courseElement, handleInputChange}) => {
    const inputEl = useRef(null);
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
        <Box>
            <p>Введите SQL-запрос, по которому система будет определять правильность ответа инженера</p>
            <SyntaxHighlightingField
                elementRef={inputEl}
                value={courseElement.answer}
                getValue={(value) => handleInputChange(value, 'answer')}
            />
        </Box>
    </>
}