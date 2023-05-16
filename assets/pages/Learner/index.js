import React, { useEffect, useState } from 'react';
import { Notice } from "/assets/components/Notice";
import { Box, Button, Chip, Container, Paper, Stack, Typography } from "@mui/material";
import { UserRepository } from "/assets/Repositories/UserRpository";
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import CourseRepository from "/assets/Repositories/CourseRepository";
import CourseSheetRepository from "../../Repositories/CourseSheetRepository";

const userColumns = [
    {headerName: 'ID', field: 'id', width: 80},
    {headerName: 'ФИО', field: 'fio', width: 300},
    {headerName: 'Email', field: 'email', width: 200},
    {headerName: 'Роли', field: 'roles', width: 400, renderCell: (params) => {
        return <Stack direction="row" spacing={1}>
            {params?.row?.roles.map((role, key) =>
                <Chip label={role} variant="outlined" size="small" key={key} onClick={(e) => handleSelectSame(e, params)} />
            )}
        </Stack>
    }},
]

const handleSelectSame = (e, params) => {
    const api = params.api;
    let selected = api.state.selection
    api.getRowModels().forEach((row, rowId) => {
        if (row?.roles.includes(e.target.innerHTML) && !selected.includes(rowId)) {
            selected.push(rowId)
        }
    })
    api.selectRows(selected)
}

const courseColumns = [
    {headerName: 'ID', field: 'id', width: 80},
    {headerName: 'Название', field: 'name', width: 300},
]

export const Learner = ({setLoader}) => {
    const [error, setError] = useState(false)
    const [userList, setUserList] = useState([])
    const [courseList, setCourseList] = useState([])
    const [courseSelection, setCourseSelection] = useState([])
    const [userSelection, setUserSelection] = useState([])

    const gridApi = useGridApiRef();

    /** @returns {Promise<User[]>} */
    const requestUserList = async () => {
        return await UserRepository.getAll();
    }

    /** @returns {Promise<Course[]>} */
    const requestCourseList = async () => {
        return await CourseRepository.getAll();
    }

    useEffect(() => {
        requestCourseList().then(dataCourseList => {
            setCourseList(dataCourseList)
            setLoader(false)
        })
        requestUserList().then(dataUserList => {
            setUserList(dataUserList)
            setLoader(false)
        })
    }, [])

    return (
        <Paper>
            <Notice message={error}/>
            <Container maxWidth={'lg'} sx={{pt: '2rem'}}>
                <Box justifyContent={'space-between'} display={'flex'} marginBottom={4}>
                    <Typography variant="h3">Назначить курс</Typography>
                    <Button variant={"contained"} onClick={() => {
                        setLoader(true)
                        courseSelection.map(course => {
                            userSelection.map(user => {
                                CourseSheetRepository.create(user, course, 'new')
                                    .then(data => {
                                        setLoader(false)
                                    })
                                    .catch(error => {
                                        setLoader(false)
                                        setError(error)
                                    })
                            })
                        })
                    }}>
                        Назначить
                    </Button>
                </Box>
                <Box sx={{my: 1}}>
                    <div style={{ height: 350, width: '100%' }}>
                        <DataGrid
                            apiRef={gridApi}
                            rows={courseList}
                            columns={courseColumns}
                            checkboxSelection
                            rowsPerPageOptions={[10, 25, 50, 100]}
                            onSelectionModelChange={setCourseSelection}
                            selectionModel={courseSelection}
                        />
                    </div>
                </Box>
                <Box sx={{my: 1}}>
                    <div style={{ height: 350, width: '100%' }}>
                        <DataGrid
                            rows={userList}
                            columns={userColumns}
                            checkboxSelection
                            rowsPerPageOptions={[10, 25, 50, 100]}
                            onSelectionModelChange={setUserSelection}
                            selectionModel={userSelection}
                            disableSelectionOnClick
                        />
                    </div>
                </Box>
            </Container>
        </Paper>
    )
}

