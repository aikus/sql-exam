import React, { useEffect, useState } from 'react';
import { Notice } from "/assets/components/Notice";
import { Box, Button, Chip, Paper, Stack, Typography } from "@mui/material";
import { UserRepository } from "/assets/Repositories/UserRpository";
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    {headerName: 'Действия', field: 'action', width: 100, renderCell: (params) => {
        return <Button variant={"outlined"}>Кнопка</Button>;
    }},
    {headerName: 'ID', field: 'id', width: 80},
    {headerName: 'ФИО', field: 'fio', width: 300},
    {headerName: 'Email', field: 'email', width: 200},
    {headerName: 'Роли', field: 'roles', width: 400, renderCell: (params) => {
        return <Stack direction="row" spacing={1}>
            {params?.row?.roles.map((role, key) =>
                <Chip label={role} variant="outlined" size="small" key={key} />
            )}
        </Stack>
    }},
]

export const Learner = ({setLoader}) => {
    const [error, setError] = useState(false)
    const [userList, setUserList] = useState([])

    /** @returns {Promise<User[]>} */
    const requestUserList = async () => {
        return await UserRepository.getAll();
    }

    useEffect(() => {
        requestUserList().then(userList => {
            setUserList(userList)
            setLoader(false)
        })
    }, [])

    return (
        <Paper>
            <Notice message={error}/>
            <Box sx={{my: 1}}>
                <Typography variant="h3">Назначить курс</Typography>
                <div style={{ height: 700, width: '100%' }}>
                    <DataGrid
                        rows={userList}
                        columns={columns}
                        checkboxSelection
                        rowsPerPageOptions={[10, 25, 50, 100]}
                    />
                </div>
            </Box>
        </Paper>
    )
}

