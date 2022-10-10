import React, { useState } from 'react';
import * as C from './styles'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {passFilterLogic} from "@mui/x-data-grid/internals";

export const TableToChoose = ({tableData, setTable}) => {

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
                    {tableData.map((row) =>
                        (
                        <TableRow
                            key={row.tableName}
                            onClick={() => {
                                setTable(row.tableName)
                            }}
                            sx={{'&:hover': {backgroundColor: '#F5F5F5', cursor: 'pointer'}}}
                        >
                            <TableCell>{row.tableName}</TableCell>
                            <TableCell>{row.linesNum}</TableCell>
                        </TableRow>
                    )
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

