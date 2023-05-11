import React, {useEffect, useState} from 'react';
import {
    Box,
    Checkbox,
    Divider,
    FormControlLabel,
    FormHelperText,
    MenuItem,
    Select,
    Typography
} from "@mui/material";
import FormControl from "@mui/material/FormControl";

export const PollSettings = () => {
    const [pollSettings, setPollSettings] = useState({
        countView: '',
        isVictorine: true
    });

    const handleChange = (e) => {
        if ('checkbox' === e.target.type) {
            addSettings(e.target.name, e.target.checked)
        }
        else {
            addSettings(e.target.name, e.target.value)
        }
    }

    const addSettings = (name, value) => {
        setPollSettings({
            ...pollSettings,
            [name]: value,
        });
    }

    useEffect(() => {
        console.log(pollSettings)
    }, [pollSettings])

    return <Box>
        <Typography>Настройки</Typography>
        <Divider sx={{ my: 2 }} />
        <FormControl sx={{ my: 1 }}>
            <Typography>Количество вариатов</Typography>
            <Select
                name={'countView'}
                value={pollSettings?.countView}
                onChange={handleChange}
            >
                <MenuItem value="">
                    <em>Не выбрано</em>
                </MenuItem>
                <MenuItem value={'4'}>Отобразать 4 варианта</MenuItem>
                <MenuItem value={'6'}>Отобразать 6 вариантов</MenuItem>
                <MenuItem value={'8'}>Отобразать 8 вариантов</MenuItem>
            </Select>
            <FormHelperText>Количество вариатов которые случайно отобразятся при прохождении курса</FormHelperText>
        </FormControl>
        <FormControlLabel
            control={<Checkbox
                name={'isVictorine'}
                checked={pollSettings?.isVictorine}
                onChange={handleChange}
            />}
            label="Доступень только один вариант"
        />
    </Box>
}