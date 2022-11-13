import React from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { H1 } from "../Typography";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import * as C from '/assets/styles/styles'

export const CourseResult = (data) => {

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
            </C.Header>
            <TableContainer component={Paper}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {
                                header().map((column) => (
                                    <TableCell key={column}>
                                        <div>{column}</div>
                                    </TableCell>
                                ))
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
                                            Object.keys(row).map((cell, ii) => (
                                                ii === (header().length-1)
                                                    ? <TableCell key={ii}>
                                                        {
                                                            null === row[cell]
                                                            ? <QuestionMarkIcon color={"warning"}/>
                                                            : row[cell]
                                                                ? <CheckIcon color={"success"}/>
                                                                : <CloseIcon color={"error"}/>
                                                        }
                                                    </TableCell>
                                                    : <TableCell key={ii}>{ row[cell] ?? 'Пока нет ответа' }</TableCell>
                                            ))
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