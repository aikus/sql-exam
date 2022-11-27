import React from 'react';
import {Card, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";

export const ReCheckReport = (props) => {

    const { report, status } = props

    return <>
        { status === 'success' && <Card variant="outlined" sx={{gap: 3}}>
            <div>Количество проверок: {report.totalCount}</div>
            <Table size={'small'}>
                <TableHead>
                    <TableRow>
                        <TableCell>ID пользователя</TableCell>
                        <TableCell>ФИО</TableCell>
                        <TableCell>Проверено</TableCell>
                        <TableCell>Завершено с ошибками</TableCell>
                        <TableCell>ID ответов</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {report.studentsReport.map((item) => {
                    return (<TableRow key={item.userId}>
                        <TableCell>{item.userId}</TableCell>
                        <TableCell>{item.fio}</TableCell>
                        <TableCell>{item.answerCountSuccess}</TableCell>
                        <TableCell>{item.answerCountError}</TableCell>
                        <TableCell>
                            {item.answerIds?.map((answerId) => {return <span>{answerId}, </span>})}
                        </TableCell>
                    </TableRow>)
                })}
                </TableBody>
            </Table>
        </Card>
        }
    </>
}

