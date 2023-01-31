import React from 'react';
import {
    TableContainer,
    Table,
    TableRow,
    TableCell,
    TableBody,
    Button, TableHead, Chip, ButtonGroup
} from '@mui/material';

export const StudentStatistic = ({data}) => {

    const columns = [
        { id: 'id', label: 'ID табеля', width: 50 },
        { id: 'courseName', label: 'Курс', minWidth: 250 },
        { id: 'sheetStatus', label: 'Статус табеля' },
        { id: 'finishTime', label: 'Время завершения' },
        { id: 'rightCount', label: 'Количество правильных' },
        { id: 'actions', label: 'Действия', minWidth: 270 },
    ]

    const tableCell = (column, row) => {
        const columnId = column.id;
        const value = row.columns[columnId];

        return <TableCell key={columnId}>
            {cellContentFabric(columnId, column, row, value)}
        </TableCell>
    }

    const cellContentFabric = (columnId, column, row, value) => {

        const container = {
            "actions": buttonCell,
            "sheetStatus": chipStatusCell,
        }

        return container[columnId] !== undefined
            ? container[columnId](value, row)
            : value;
    }

    const chipStatusCell = (value, row) => {
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

    const buttonCell = (value, row) => {
        const params = row.params;
        const sheetStatus = row.columns.sheetStatus;

        const buttonContainer = {
            "new": [startBtn],
            "started": [continueBtn],
            "completed": [resultsBtn],
            "restartable": [passAgainBtn, resultsBtn],
        }

        return <ButtonGroup>
            {
                buttonContainer[sheetStatus] !== undefined
                    ? buttonContainer[sheetStatus].map((buttonCallback, key) => {
                        return buttonCallback(key, params);
                    })
                    : value
            }
        </ButtonGroup>
    }

    const startBtn = (key, param) => {
        return btn(
            key,
            `/react/my-profile/practice?course=${param?.courseId}`,
            'Начать'
        )
    }

    const continueBtn = (key, param) => {
        return btn(
            key,
            `/react/my-profile/practice?course=${param?.courseId}`,
            'Продолжить'
        )
    }

    const passAgainBtn = (key, param) => {
        return btn(
            key,
            `/react/my-profile/practice?course=${param?.courseId}`,
            'Пройти снова'
        )
    }

    const resultsBtn = (key, param) => {
        return btn(
            key,
            `/react/my-profile/student-result?course=${param?.courseId}&student=${param?.studentId}`,
            'Результаты'
        )
    }

    const btn = (key, href, name) => {
        return <Button
            key={key}
            variant={"outlined"}
            href={href}
            target="_blank"
            underline="none"
        >
            {name}
        </Button>
    }

    return (data !== undefined)
        ? <TableContainer>
            <Table stickyHeader aria-label="sticky table" size={'small'}>
                <TableHead>
                    <TableRow>
                        {
                            columns.map((col, key) => {
                                return <TableCell key={key} sx={{
                                    width: col.width,
                                    minWidth: col.minWidth
                                }}>{col.label}</TableCell>
                            })
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((row) => {
                            return (
                                <TableRow hover tabIndex={-1} key={row?.columns.id}>
                                    {columns.map((column) => {
                                        return (tableCell(column, row));
                                    })}
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
        </TableContainer>
        : '';
}
