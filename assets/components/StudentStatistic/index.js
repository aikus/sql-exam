import React from 'react';
import {
    TableContainer,
    Table,
    TableRow,
    TableCell,
    TableBody,
    Button, TableHead, Chip, Link
} from '@mui/material';

export const StudentStatistic = ({data}) => {

    const columns = [
        { id: 'id', label: 'ID табеля', width: 50 },
        { id: 'courseName', label: 'Курс', minWidth: 250 },
        { id: 'sheetStatus', label: 'Статус табеля' },
        { id: 'finishTime', label: 'Время завершения' },
        { id: 'rightCount', label: 'Количество правильных' },
        { id: 'actions', label: 'Действия' },
    ]

    const tableCell = (column, row, params) => {
        const value = row[column.id];

        return <TableCell key={column.id}>
            {cellContentFabric(column.id, value, params)}
        </TableCell>
    }

    const cellContentFabric = (columnId, value, params) => {

        let container = {
            "actions": buttonCell,
            "sheetStatus": chipStatusCell,
        }

        return container[columnId] !== undefined
            ? container[columnId](value, params)
            : value;
    }

    const chipStatusCell = (value, params) => {
        const sheetStatusTranslator = {
            "new": "Новый",
            "started": "Начат",
            "completed": "Завершён",
            "restartable": "Можно пройти снова"
        }
        if (value) {
            return <Chip label={sheetStatusTranslator[value]} title={value}/>;
        }

        return '';
    }

    const buttonCell = (value, params) => {
        return <Button
            variant={"outlined"}
            href={`/react/my-profile/student-result?course=${params?.courseId}&student=${params?.studentId}`}
            target="_blank"
            underline="none"
        >
            Результаты
        </Button>
    }

    return (data !== undefined)
        ? <TableContainer>
            <Table stickyHeader aria-label="sticky table" size={'small'}>
                <TableHead>
                    <TableRow>
                        {
                            columns.map((col, key) => {
                                return <TableCell key={key}>{col.label}</TableCell>
                            })
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((row) => {
                            return (
                                <TableRow hover tabIndex={-1} key={row?.columns.id}>
                                    {columns.map((column) => {
                                        return (tableCell(column, row.columns, row.params));
                                    })}
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
        </TableContainer>
        : '';
}
