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

export const ExampleTable = ({table}) => {

    function createData(column_1, column_2, column_3, column_4) {
        return { column_1, column_2, column_3, column_4 };
    }

    const rows = [
        createData('Giacoma Guilizzoni', 40, 'Peldi', '2022-04-11 03:18:18'),
        createData('Marco', 38, '', '2022-04-11 03:18:18'),
        createData('Mariah', 20, 'Patata', '2022-04-11 03:18:18'),
        createData('Valerie', 15, 'Val', '2022-04-11 03:18:18'),
    ];

    return (
        <TableContainer component={Paper}>
            <Table size='small'>
                <TableHead>
                    <TableRow sx={{backgroundColor: '#CCCCCC', '& > th': { fontWeight: '600' }}}>
                        <TableCell><div>Атрибут 1</div><div>VARCHAR</div></TableCell>
                        <TableCell><div>Атрибут 2</div><div>INT</div></TableCell>
                        <TableCell><div>Атрибут 3</div><div>LONGTEXT</div></TableCell>
                        <TableCell><div>Атрибут 4</div><div>DATETIME</div></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.column_1}
                        >
                            <TableCell>{row.column_1}</TableCell>
                            <TableCell>{row.column_2}</TableCell>
                            <TableCell>{row.column_3}</TableCell>
                            <TableCell>{row.column_4}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

