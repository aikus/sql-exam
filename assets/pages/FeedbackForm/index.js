import React, { useEffect, useState } from 'react';
import { Notice } from "/assets/components/Notice";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { UserRepository } from "/assets/Repositories/UserRpository";
import { ScirpusDropzone } from "/assets/components/Upload/ScirpusDropzone";
import { MessageRepository } from "/assets/Repositories/VisitorFeedback/MessageRepository";
import { ScreenshotRepository } from "/assets/Repositories/VisitorFeedback/ScreenshotRepository";

export const FeedbackForm = ({setLoader}) => {
    const [error, setError] = useState(false)
    const [user, setUser] = useState(null)
    const [relationId, setRelationId] = useState(null)
    const [formData, setFormData] = useState({})

    /** @returns {Promise<User>} */
    const requestUser = async () => {
        return await UserRepository.getUserInfo();
    }

    const handleInput = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        addFormField(name, value);
    }

    const addFormField = (name, value) => {
        formData[name] = value;
        setFormData(formData);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoader(true);
        const target = event.target;
        const elements = target.elements;

        for (let key in elements) {
            if (elements.hasOwnProperty(key)) {
                let element = elements[key];
                if (element.nodeName === 'TEXTAREA' || element.nodeName === 'INPUT') {
                    if ('' !== element.name) {
                        addFormField(element.name, element.value);
                    }
                }
            }
        }

        save(formData);
    }

    const save = (data) => {
        MessageRepository.create(
            data,
            data => {
                setRelationId(data.id);
                setLoader(false)
            },
            error => setLoader(false)
        )
            .then(r => r);
    }

    useEffect(() => {
        requestUser().then(user => {
            setUser(user)
            setFormData['fio'] = user?.fio;
            setLoader(false)
        })
    }, [])

    return (
        <Paper>
            <Notice message={error}/>
            <Box mx={"auto"} sx={{maxWidth: '50ch', p: 3}}>
                <Typography sx={{m: 1}}>Оставьте обратную связь</Typography>
                <Box
                    component="form"
                    sx={{'& .MuiTextField-root': { m: 1 }}}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <FormControl sx={{minWidth: '100%'}}>
                        <TextField
                            id="message"
                            name="message"
                            label="Текст сообщения"
                            multiline
                            rows={4}
                            onChange={handleInput}
                        />
                        <ScirpusDropzone messageId={relationId} setMessageId={setRelationId} repository={ScreenshotRepository} />
                        <TextField
                            id="fio"
                            name="fio"
                            label="Фамилия Имя"
                            disabled
                            variant="outlined"
                            value={user?.fio ?? ''}
                            onChange={handleInput}
                        />
                        <TextField
                            id="contact"
                            name="contact"
                            label="Телеграм или Email"
                            variant="outlined"
                            helperText="Контакт для обратно связи, если вам она нужна"
                            onChange={handleInput}
                        />
                        <Button
                            sx={{m: 1}}
                            variant="contained"
                            type={'submit'}
                        >
                            Отправить
                        </Button>
                    </FormControl >
                </Box>
            </Box>
        </Paper>
    )
}

