import React, { useState } from 'react';
import * as C from './styles'
import { TextM, TextL, TextS, H2, H5 } from '../../components/Typography'
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

export const ExampleTable = ({tableData}) => {

    return (
        <TableContainer component={Paper}>
            <Table size='small'>
                <TableHead>
                    <TableRow sx={{backgroundColor: '#CCCCCC', '& > th': { fontWeight: '600' }}}>
                        {tableData.header.map((column) => (
                            <TableCell key={column.attribute}>
                                <div>{column.attribute}</div><div>{column.type}</div>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.body.map((row) => (
                        <TableRow
                            key={row[0]}
                        >
                            {row.map((cell) => (
                                <TableCell key={cell}>{cell}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

