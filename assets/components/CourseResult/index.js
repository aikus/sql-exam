import React from 'react';
import {TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button} from '@mui/material';
import {H1} from "../Typography";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import * as C from '/assets/styles/styles'
import {useNavigate} from "react-router-dom";

export const CourseResult = (data) => {
    const isTeacher = data.isTeacher;
    const navigate = useNavigate();
    const header = () => {
        let result = [];
        if (isSetResult()) {
            for (let key in data.personalResult.table[0]) {
                result.push(key)
            }
        }
        return result.length > 0 ? result : ['']
    }

    const isSetResult = () => {
        return data.personalResult.hasOwnProperty('table')
            && data.personalResult.table.length > 0;
    }

    return (
        <>
            <C.Header>
                <H1>{data.personalResult?.courseName}</H1>
                <p>{data.personalResult?.fio}</p>
            </C.Header>
            <TableContainer component={Paper}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {
                                header().map((column) => {
                                    return "metaData" !== column ? <TableCell key={column}>
                                        <div>{column}</div>
                                    </TableCell> : null
                                })
                            }
                            {
                                isTeacher &&
                                <TableCell>Проверить</TableCell>
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            isSetResult()
                                ? data.personalResult?.table.map((row, i) => (
                                    <TableRow
                                        key={i}
                                    >
                                        {
                                            Object.keys(row).map((cell, ii) => "metaData" !== cell ? (
                                                'Статус' === cell
                                                    ? <TableCell key={ii}>
                                                        {
                                                            null === row[cell]
                                                                ? <RemoveIcon color={"secondary"}/>
                                                                : row[cell]
                                                                    ? <CheckIcon color={"success"}/>
                                                                    : <CloseIcon color={"error"}/>
                                                        }
                                                    </TableCell>
                                                    : <TableCell key={ii}>{row[cell] ?? 'Пока нет ответа'}</TableCell>
                                            ) : "")
                                        }
                                        {
                                            isTeacher &&
                                            <TableCell>
                                                {row.metaData.answerId ? <Button
                                                    size='medium'
                                                    variant='outlined'
                                                    color="secondary"
                                                    onClick={() => navigate("/react/my-profile/check-answer?sheet=" +
                                                        row.metaData.sheetId + "&answer=" + row.metaData.answerId)}
                                                >Проверить</Button> : <></>}
                                            </TableCell>
                                        }
                                    </TableRow>
                                ))
                                : <TableRow><TableCell>Здесь пока нет данных</TableCell></TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}