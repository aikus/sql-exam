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
    // const [type, setType] = useState(initType)
    //
    // const handleChangeType = (e, i) => {
    //     console.log(e.target.value)
    //     setType((prevState) => ({
    //         ...prevState,
    //         [i]: {type: e.target.value, link: ''}
    //     }))
    // }
    //
    // const chooseField = (done) => {
    //     const status = done.toLowerCase()
    //
    //     if (!status) {
    //         return [
    //             <MenuItem value='практика'>Практика</MenuItem>,
    //             <MenuItem value='теория'>Теория</MenuItem>
    //         ]
    //     }
    //     if (status === 'практика') return  <MenuItem value='теория'>Теория</MenuItem>
    //     if (status === 'теория') return <MenuItem value='практика'>Практика</MenuItem>
    // }

    return (
        <TableContainer component={Paper} sx={{marginTop: '16px'}}>
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
                                            {/*<TextField*/}
                                            {/*    id={`form-${i+1}`}*/}
                                            {/*    type="text"*/}
                                            {/*    variant="outlined"*/}
                                            {/*    multiline={true}*/}
                                            {/*    fullWidth={true}*/}
                                            {/*    value={request}*/}
                                            {/*    onChange={(e) => handleChangeLinks(e)}*/}
                                            {/*/>*/}
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