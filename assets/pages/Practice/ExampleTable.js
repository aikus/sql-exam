import React, { useState, useEffect } from 'react';
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

    const header = () => {
        let accumArr = []
        for (let key in tableData.table[0]) {
            accumArr.push(key)
        }
        console.log('accumArr', accumArr)
        return accumArr ?? []
    }

    return (
        <TableContainer component={Paper}>
            <Table size='small'>
                <TableHead>
                    <TableRow sx={{backgroundColor: '#CCCCCC', '& > th': { fontWeight: '600' }}}>
                        {header().map((column) => (
                            <TableCell key={column}>
                                <div>{column}</div>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.table.map((row, i) => (
                        <TableRow
                            key={i}
                        >
                            {header().map((cell) => (
                              <TableCell key={cell}>{row[cell]}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

