import React, { useState, useEffect } from 'react';
import * as C from './styles'
import { TextM, TextL, TextS, H2, H3 } from '../../components/Typography'
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const initType = () => {
    let accumulator = {}

    for (let i = 0; i < data.length; i++) {
        accumulator[i] = ''
    }

    return accumulator
}

export const SkillTable = () => {
    const [type, setType] = useState(initType)

    const handleChangeType = (e, i) => {
        console.log(e.target.value)
        setType((prevState) => ({
            ...prevState,
            [i]: e.target.value
        }))
    }

    const chooseField = (done) => {
        const status = done.toLowerCase()

        if (!status) {
            return [
                <MenuItem value='практика'>Практика</MenuItem>,
                <MenuItem value='теория'>Теория</MenuItem>
            ]
        }
        if (status === 'практика') return  <MenuItem value='теория'>Теория</MenuItem>
        if (status === 'теория') return <MenuItem value='практика'>Практика</MenuItem>
    }

    return (
        <TableContainer component={Paper} sx={{marginTop: '16px'}}>
            <Table size='small'>
                <TableHead>
                    <TableRow sx={{backgroundColor: '#CCCCCC', '& > th': { fontWeight: '600' }}}>
                        <TableCell>Скилл</TableCell>
                        <TableCell>Описание</TableCell>
                        <TableCell>Группа скила</TableCell>
                        <TableCell>Зачтено</TableCell>
                        <TableCell>Принадлежность</TableCell>
                        <TableCell>Тип сдачи</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, i) => (
                        <TableRow
                            key={i}
                        >
                            <TableCell>{row.skill}</TableCell>
                            <TableCell>{row.description}</TableCell>
                            <TableCell>{row.skill_group}</TableCell>
                            <TableCell>{row.done}</TableCell>
                            <TableCell>{row.belonging}</TableCell>
                            <TableCell>
                                <FormControl sx={{minWidth: 130}} size="small">
                                    <Select
                                        value={type[i]}
                                        onChange={(e) => handleChangeType(e, i)}
                                        displayEmpty
                                        sx={{fontSize: '14px'}}
                                    >
                                        <MenuItem value=''>Не выбрано</MenuItem>
                                        {chooseField(row.done)}
                                    </Select>
                                </FormControl>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

const data = [
    {'skill': 'BPMN 2.0', 'description': 'тут текст с описанием', 'skill_group': 'построение диаграмм/схем', 'done': '', 'belonging': 'Общий'},
    {'skill': 'API', 'description': 'тут текст с описанием', 'skill_group': 'построение диаграмм/схем', 'done': '', 'belonging': 'Общий'},
    {'skill': 'Камунда', 'description': 'тут текст с описанием', 'skill_group': 'построение диаграмм/схем', 'done': 'теория', 'belonging': 'Общий'},
    {'skill': 'BPMN 2.0', 'description': 'тут текст с описанием', 'skill_group': 'построение диаграмм/схем', 'done': 'практика', 'belonging': 'Общий'},
    {'skill': 'BPMN 2.0', 'description': 'тут текст с описанием', 'skill_group': 'построение диаграмм/схем', 'done': '', 'belonging': 'Общий'},
    {'skill': 'BPMN 2.0', 'description': 'тут текст с описанием', 'skill_group': 'построение диаграмм/схем', 'done': '', 'belonging': 'Общий'},
]