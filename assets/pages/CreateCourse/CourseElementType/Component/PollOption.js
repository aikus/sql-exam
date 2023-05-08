import React from 'react';
import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import {Add, Check, CheckBox, CheckBoxOutlineBlank, Close, CropSquare, Delete} from "@mui/icons-material";

export const PollOption = ({index, option, handleOptionText, addPollOption, handleOptionIsRight, removePollOption}) => {

    return <Paper
        sx={{ p: '2px 4px', my: 4, display: 'flex', alignItems: 'center' }}
    >
        <IconButton color={'primary'} sx={{ p: '10px' }} aria-label="directions" onClick={() => {
            removePollOption(index)
        }}>
            <Delete />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

        <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder={`Вариант ответа №${index+1}`}
            inputProps={{ 'aria-label': 'search google maps' }}
            value={option.text}
            onChange={(e) => {handleOptionText(index, e.target.value)}}
        />
        <IconButton color="primary" type="button" sx={{ p: '10px' }} aria-label="add" onClick={() => {
            addPollOption(index)
        }}>
            <Add />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton sx={{ p: '10px' }} aria-label="directions" onClick={() => {
            handleOptionIsRight(index)
        }}>
            {option.isRight ? <CheckBox /> : <CheckBoxOutlineBlank />}
        </IconButton>
    </Paper>

}