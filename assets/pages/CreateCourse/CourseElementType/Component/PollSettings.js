import React, { useState } from 'react';
import { Box, Divider, FormHelperText, MenuItem, Select, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";

export const PollSettings = () => {
    const [pollSettings, setPollSettings] = useState('');

    const handleChange = e => {
        setPollSettings(e.target.value)
    }

    return <Box>
        <Typography>Настройки</Typography>
        <Divider sx={{ my: 2 }} />
        <FormControl sx={{ my: 1 }}>
            <Typography>Количество вариатов</Typography>
            <Select
                value={pollSettings}
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
    </Box>
}