import React from 'react';
import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
    Button
} from '@mui/material';
import { useNavigate } from "react-router-dom";

export const ReportTable = ({report}) => {

    const navigate = useNavigate();
    const columns = [
        { id: 'id', label: 'ID', width: 50 },
        { id: 'fio', label: 'ФИО', minWidth: 250 },
        { id: 'finishTime', label: 'Время завершения', width: 50 },
        { id: 'rightCount', label: 'Количество выполненных', width: 50 },
        { id: 'status', label: 'Статус', width: 50 },
        { id: 'actions', label: 'Действия', width: 50 },
    ];
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const rows = () => {
        return report
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const goToReportByStudent = (params) => {
        navigate(`/react/my-profile/student-result?course=${params?.courseId}&student=${params?.studentId}`)
    }

    const tableCell = (column, row) => {
        const value = row[column.id]?.value;
        return <TableCell key={column.id} align={column.align}>
            {column.id === 'actions'
                ? <Button
                    variant={"contained"}
                    onClick={() => {goToReportByStudent(row[column.id]?.params)}}
                >
                    {value}
                </Button>
                : value}
        </TableCell>
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table" size={'small'}>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, width: column.width }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows()
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id?.value}>
                                        {columns.map((column) => {
                                            return (tableCell(column, row));
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={rows().length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
