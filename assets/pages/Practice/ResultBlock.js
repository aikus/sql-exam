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
import {Alert, AlertTitle} from "@mui/material";

export const ResultBlock = tableData => {

    if ('' !== tableData.data.error) {
        return (
            <>
                <Alert severity={"warning"}>
                    <AlertTitle>Результат запроса</AlertTitle>
                    <div>{tableData.data.error}</div>
                </Alert>
            </>
        );
    }

    if (0 === tableData.data.result.length) {
        return (
            <>
                <div>Результат</div>
                <div>Пустой ответ</div>
            </>
        );
    }

    return (
        <>
            <C.TableWrapper>
                <div>Результат</div>
                <br/>
                <TableContainer component={Paper}>
                    <Table size='small'>
                        <TableHead>
                            <TableRow sx={{backgroundColor: '#CCCCCC', '& > th': { fontWeight: '600' }}}>
                                {tableData.data?.header.map((column) => (
                                    <TableCell>
                                        <div>{column.name}</div>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.data?.result.map((row, key) => (
                                <TableRow key={key+1}>
                                    {row.map((cell) => (
                                        <TableCell>{cell}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </C.TableWrapper>
        </>
    )
}

