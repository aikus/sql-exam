import React from 'react';
import {Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

export const ReCheckReport = (props) => {

    const { report, status } = props

    return <TableContainer>
        { status === 'success' && <Table size={'small'}>
            <TableHead>
                <TableRow>
                    <TableCell colSpan={5}>Количество проверок: {report.totalCount}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>ID пользователя</TableCell>
                    <TableCell>ФИО</TableCell>
                    <TableCell>Проверено</TableCell>
                    <TableCell>Завершено с ошибками</TableCell>
                    <TableCell>Изменился статус у ответов</TableCell>
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
                        {
                            item.answerIds.length > 0
                                ? item.answerIds?.map((answerId) => {return <span>{answerId}, </span>})
                                : 'нет изменений'
                        }
                    </TableCell>
                </TableRow>)
            })}
            </TableBody>
        </Table>
        }
    </TableContainer>
}

