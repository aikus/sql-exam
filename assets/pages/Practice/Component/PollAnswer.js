import React, { useEffect, useState } from 'react';
import { Box, Button, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { CourseElementPollOptionRepository } from "/assets/Repositories/CourseElementPollOptionRepository";
import FormControl from "@mui/material/FormControl";

function BpRadio(props) {
    return (
        <Radio
            disableRipple
            color="default"
            {...props}
        />
    );
}

export const PollAnswer = ({element, handlePollAnswer}) => {
    const [pollOptions, setPollOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleRadioChange = (event) => {
        setSelectedOptions([event.target.value]);
    };

    useEffect(() => {
        CourseElementPollOptionRepository.getByCourseElement(element).then(data => {
            setPollOptions(data)
        })
    }, [])

    return <Box>
        <FormControl>
            <FormLabel id="demo-customized-radios">Выберите вариант:</FormLabel>
            <RadioGroup
                aria-labelledby="demo-customized-radios"
                name="customized-radios"
                onChange={handleRadioChange}
            >
                {pollOptions.map((pollOption, key) =>
                    <FormControlLabel
                        key={key}
                        value={pollOption.id}
                        control={<BpRadio />}
                        label={pollOption.text}
                    />
                )}
            </RadioGroup>
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