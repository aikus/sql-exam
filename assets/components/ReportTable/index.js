import React, {useEffect, useState} from 'react';
import {
    TableContainer,
    Paper,
    Table,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
    Button, Container
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import {HttpRequest} from "../../Service/HttpRequest";
import {Notice} from "../Notice";
import {ReCheckReport} from "./ReCheckReport";

function descendingComparator(a, b, orderBy) {
    if (b[orderBy]?.value < a[orderBy]?.value) {
        return -1;
    }
    if (b[orderBy]?.value > a[orderBy]?.value) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

export const ReportTable = ({title = '', courseId = null, rows = []}) => {

    const navigate = useNavigate()

    const [order, setOrder] = React.useState('asc')
    const [orderBy, setOrderBy] = React.useState('calories')
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [reCheckReport, setReCheckReport] = useState({status: null, report: []})
    const [error, setError] = useState(false)
    const columns = [
        { id: 'id', label: 'ID', width: 50 },
        { id: 'fio', label: 'ФИО', minWidth: 250 },
        { id: 'finishTime', label: 'Время завершения', width: 50 },
        { id: 'rightCount', label: 'Количество выполненных', width: 50 },
        { id: 'status', label: 'Статус', width: 50 },
        { id: 'actions', label: 'Действия', width: 50 },
    ]

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    }

    const handleReCheck = (loader, setLoader, setReCheckSuccess) => {
        if (!loader) {
            setLoader(true);
            HttpRequest.get('/api/re-check/'+courseId,
                data => {
                    setReCheckReport(data);
                    setReCheckSuccess(data.status === 'success')
                    setLoader(false);
                },
                error => {
                    console.info('error', error)
                    setError(error)
                    setLoader(false);
                }
            )
        }

    }

    const closeReCheck = () => {
        setReCheckReport({status: null, report: []})
    }

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
            <Notice message={error}/>

            <EnhancedTableToolbar title={title} handleReCheck={handleReCheck} closeReCheck={closeReCheck}/>
            <Container>
                <ReCheckReport report={reCheckReport.report} status={reCheckReport.status} />
            </Container>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table" size={'small'}>
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        columns={columns}
                    />
                    <TableBody>
                        {stableSort(rows ?? [], getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover tabIndex={-1} key={row.id?.value}>
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
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
