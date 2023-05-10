import React from 'react';
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { Alert, AlertTitle } from "@mui/material";

export const ResultBlock = tableData => {

    if ('' !== tableData.data.error) {
      return <Alert severity={"warning"}>
        <AlertTitle>Результат запроса</AlertTitle>
        <div>{tableData.data.error}</div>
      </Alert>
    }

    if (0 === tableData.data.result.length) {
      return <>
        <div>Результат</div>
        <div>Пустой ответ</div>
      </>
    }

    return <>
      <div>Результат</div>
      <br/>
      <TableContainer component={Paper}>
        <Table size='small'>
          <TableHead>
            <TableRow sx={{backgroundColor: '#CCCCCC', '& > th': { fontWeight: '600' }}}>
              {tableData.data?.header.map((column, columnKey) => (
                <TableCell key={columnKey}>
                  <div>{column.name}</div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.data?.result.map((row, key) => (
              <TableRow key={key}>
                {row.map((cell, cellKey) => (
                  <TableCell key={cellKey}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
}

