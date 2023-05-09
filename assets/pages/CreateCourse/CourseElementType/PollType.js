import React, { useEffect, useState } from 'react';
import { Editor } from "react-draft-wysiwyg";
import { wysiwygConfig } from "/assets/config";
import { CourseElementTitleInput } from "./Component/CourseElementTitleInput";
import { Box, Button, Grid, Typography } from "@mui/material";
import { PollOption } from "./Component/PollOption";
import { ScirpusSnackbar } from "../../../Tamplate/Feedback/ScirpusSnackbar";
import { CourseElementPollOptionRepository } from "../../../Repositories/CourseElementPollOptionRepository";
import { PollSettings } from "./Component/PollSettings";

const addEmptyOptionBtn = (pollOptions, addEmptyOption) => {
    return 0 === pollOptions.length
        ? <Button
            variant={'outlined'}
            onClick={addEmptyOption}
        >
            Добавить вариант
        </Button>
        : '';
}

export const PollType = ({step, courseElement, handleInputChange, handlePollChange}) => {
    const [notify, setNotify] = useState(null)
    const [pollOptions, setPollOptions] = useState([]);

    const handleOptionText = (index, optionText) => {
        setPollOptions(prevState => {
            let newState = [...prevState]
            newState[index].text = optionText
            return newState
        })
    }

    const handleOptionIsRight = index => {
        setPollOptions(prevState => {
            let newState = [...prevState]
            newState[index].isRight = !newState[index].isRight
            return newState
        })
    }

    const removePollOption = (index) => {
        if (pollOptions.length <= 2) {
            setNotify('Нельзя оставить менне 2-х вариантов ответа')
            return;
        }
        setPollOptions(prevState => {
            let newState = [...prevState]
            newState.splice(index, 1)
            return newState
        })
        CourseElementPollOptionRepository.remove(pollOptions[index]).then(data => {
            console.log('remove poll option', data)
        })
    }

    /** @param index - номер элемента после оторого вставляется новый элемент */
    const addPollOption = index => {
        setPollOptions(prevState => {
            let newState = [...prevState]
            newState.splice(index+1, 0, {text: '', isRight: false});
            return newState
        })
    }

    const addEmptyOption = () => {
        setPollOptions(prevState => {
            return [...prevState,  {text: '', isRight: false}]
        })
    }

    useEffect(() => {
        CourseElementPollOptionRepository.getByCourseElement(courseElement).then(data => {
            setPollOptions(data)
        })
        handlePollChange(pollOptions)
    }, [])

    useEffect(() => {
        handlePollChange(pollOptions)
    }, [pollOptions])

    return <>
        {notify ? <ScirpusSnackbar message={notify} clearMessage={() => {setNotify(null)}}/> : ''}
        <CourseElementTitleInput
            label={'Введите заголовок'}
            step={step}
            value={courseElement.name}
            onChange={(e) => handleInputChange(e.target.value, 'name')}
        />
        <Box>
            <Typography sx={{my: 1}}>Введите текст вопроса</Typography>
            <Editor
                id={`course-${step}`}
                editorState={courseElement.description}
                editorClassName='wysiwyg-editor'
                toolbarClassName='wysiwyg-toolbar'
                toolbar={wysiwygConfig}
                onEditorStateChange={(e) => handleInputChange(e, 'description')}
            />
        </Box>
        <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
                <Box sx={{my: 4}}>
                    {pollOptions?.map((option, key) =>
                        <PollOption
                            key={key}
                            index={key}
                            option={option}
                            handleOptionText={handleOptionText}
                            addPollOption={addPollOption}
                            handleOptionIsRight={handleOptionIsRight}
                            removePollOption={removePollOption}
                        />
                    )}
                    { addEmptyOptionBtn(pollOptions, addEmptyOption) }
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box sx={{my: 4}}>
                    <PollSettings />
                </Box>
            </Grid>
        </Grid>
    </>
}
