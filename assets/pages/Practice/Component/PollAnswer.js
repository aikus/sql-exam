import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Radio,
    RadioGroup,
    Typography
} from "@mui/material";
import { CourseElementPollOptionRepository } from "/assets/Repositories/CourseElementPollOptionRepository";
import { CourseElementSettingRepository } from "/assets/Repositories/CourseElementSettingRepository";
import FormControl from "@mui/material/FormControl";

function ScirpusRadio(props) {
    return (
        <Radio
            disableRipple
            color="default"
            {...props}
        />
    );
}

export const PollAnswer = ({element, handlePollAnswer}) => {
    const [elementSettings, setElementSettings] = useState([]);
    const [pollOptions, setPollOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleRadioChange = (event) => {
        setSelectedOptions([event.target.value]);
    };

    const handleCheckboxChange = (event) => {
        setSelectedOptions(state => {
            const value = event.target.value;
            return state.includes(value) ? state : [...state, value];
        });
    };

    const isVictorine = () => {
        return 1 === +getSetting('isVictorine')
    }

    const countView = () => {
        return +getSetting('countView')
    }

    const isRandomOrder = () => {
        return 1 === +getSetting('isRandomOrder')
    }

    const getSetting = name => {
        return elementSettings.filter(setting => setting.property === name)[0]?.value
    }

    useEffect(() => {
        setPollOptions([]);
        CourseElementSettingRepository.getByCourseElement(element).then(settings => {
            setElementSettings(settings)
            CourseElementPollOptionRepository.getByCourseElement(element).then(data => {
                const count = countView();

                if (isRandomOrder()) {
                    data.sort((a, b) => Math.round(Math.random() * 2) - 1);
                }
                else {
                    data.sort((a, b) => a.id > b.id ? 1 : -1);
                }

                if (count > 0) {
                    data.slice(0, count)
                }
                setPollOptions(data)
            }).catch(error => console.error(error))
        }).catch(error => console.error(error))

    }, [element])

    return <Box>
        <FormControl>
            {
                isVictorine()
                ? <Box>
                    <FormLabel id="labelPollAnswer">Выберите вариант:</FormLabel>
                    <RadioGroup
                        aria-labelledby="labelPollAnswer"
                        name="pollAnswer"
                        onChange={handleRadioChange}
                    >
                        {pollOptions.map((pollOption, key) =>
                            <FormControlLabel
                                key={key}
                                value={pollOption.id}
                                control={<ScirpusRadio />}
                                label={pollOption.text}
                            />
                        )}
                    </RadioGroup>
                </Box>
                : <Box>
                    <Typography>Выберите варианты:</Typography>
                    <FormGroup>
                        {pollOptions.map((pollOption, key) =>
                            <FormControlLabel
                                key={key}
                                value={pollOption.id}
                                control={<Checkbox />}
                                label={pollOption.text}
                                onChange={handleCheckboxChange}
                            />
                        )}
                    </FormGroup>
                </Box>
            }
        </FormControl>
        <Box sx={{mt: 4}}>
            <Button
                variant='contained'
                size='medium'
                onClick={() => {
                    handlePollAnswer(selectedOptions)
                }}
            >
                Отправить ответ
            </Button>
        </Box>
    </Box>
}