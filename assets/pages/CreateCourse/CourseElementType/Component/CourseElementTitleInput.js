import React from 'react';
import { Box, TextField } from "@mui/material";

export const CourseElementTitleInput = ({label, step, value, onChange}) => {
    return <Box>
        <p>{label}</p>
        <TextField
            required
            id={`course-element-name-${step}`}
            type="text"
            variant="outlined"
            multiline={false}
            fullWidth={true}
            value={value}
            onChange={onChange}
        />
    </Box>
}
