import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Box, Divider} from "@mui/material";

export const TableToChoose = ({tableData, setChosenTable}) => {
    const [selectedRowName, setSelectedRowName] = useState([]);

    return <Box sx={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: 1,
        '& hr': {
            mx: 2,
        },
    }}>
        <Divider orientation="vertical" flexItem sx={{
            display: { xs: 'none', md: 'block' }
        }} />
        <TableContainer component={ Paper } sx={{ maxWidth: '400px' }}>
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: '#CCCCCC', '& > th': { fontWeight: '600' } }}>
                        <TableCell>Название таблицы</TableCell>
                        <TableCell>Кол-во строк</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.map((row, key) => {
                        const isItemSelected = selectedRowName === row.tableName;
                        return <TableRow
                            key={key}
                            onClick={() => {
                                setSelectedRowName(row.tableName)
                                setChosenTable(row.tableName)
                            }}
                            selected={isItemSelected}
                            sx={{'&:hover': {backgroundColor: '#F5F5F5', cursor: 'pointer'}}}
                        >
                            <TableCell>{row.tableName}</TableCell>
                            <TableCell>{row.linesNum}</TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    </Box>
}

