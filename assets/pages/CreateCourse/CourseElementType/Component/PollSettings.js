import React from 'react';
import { Box, Divider, FormHelperText, MenuItem, Select, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";

export const PollSettings = () => {
    return <Box>
        <Typography>Настройки</Typography>
        <Divider sx={{ my: 2 }} />
        <FormControl sx={{ my: 1 }}>
            <Typography>Количество вариатов</Typography>
            <Select>
                <MenuItem value="">
                    <em>Не выбрано</em>
                </MenuItem>
                <MenuItem value={4}>Отобразать 4 варианта</MenuItem>
                <MenuItem value={6}>Отобразать 6 вариантов</MenuItem>
                <MenuItem value={8}>Отобразать 8 вариантов</MenuItem>
            </Select>
            <FormHelperText>Количество вариатов которые случайно отобразятся при прохождении курса</FormHelperText>
        </FormControl>
    </Box>
}