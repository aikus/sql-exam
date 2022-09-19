import React, { useState } from 'react';
import * as C from './styles'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const TableToChoose = ({setTable}) => {

    const test = (table) => {
        setTable(table)
    }

    function createData(tableName, linesNum) {
        return { tableName, linesNum };
    }

    const rows = [
        createData('Таблица 1', 40),
        createData('Таблица 2', 38),
        createData('Таблица 3', 20),
        createData('Таблица 4', 15),
    ];

    return (
        <TableContainer component={Paper} sx={{maxWidth: '400px'}}>
            <Table>
                <TableHead>
                    <TableRow sx={{backgroundColor: '#CCCCCC', '& > th': { fontWeight: '600' }}}>
                        <TableCell>Название таблицы</TableCell>
                        <TableCell>Кол-во строк</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.tableName}
                            onClick={() => {
                                test(row.tableName)
                            }}
                            sx={{'&:hover': {backgroundColor: '#F5F5F5', cursor: 'pointer'}}}
                        >
                            <TableCell>{row.tableName}</TableCell>
                            <TableCell>{row.linesNum}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

