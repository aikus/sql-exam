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
import {TextField} from "@mui/material";

export const ArtefactTable = ({rawData, tableData, setLinks}) => {

    return (
        <TableContainer component={Paper}>
            <Table size='small'>
                <TableHead>
                    <TableRow sx={{backgroundColor: '#CCCCCC', '& > th': { fontWeight: '600' }}}>
                        <TableCell>Скилл</TableCell>
                        <TableCell>Описание</TableCell>
                        <TableCell>Ссылки</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rawData.map((row, i) => {
                        if (tableData[i].type === 'практика') {
                            return (
                                    <TableRow
                                        key={i}
                                    >
                                        <TableCell>{row.skill}</TableCell>
                                        <TableCell>{row.description}</TableCell>
                                        <TableCell>
                                            <TextField
                                                id={`form-${i+1}`}
                                                type="text"
                                                variant="outlined"
                                                multiline={true}
                                                fullWidth={true}
                                                value={tableData[i].link}
                                                onChange={(e) => {
                                                    setLinks((prevState) => ({
                                                        ...prevState,
                                                        [i]: {type: prevState[i].type, link: e.target.value}
                                                    }))
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                )

                        }
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}