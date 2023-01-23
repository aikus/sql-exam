import React, { useEffect, useState } from 'react';
import { UrlService } from "../../Service/UrlService";
import { HttpRequest } from "../../Service/HttpRequest";
import { Notice } from "../../components/Notice";
import { Loader } from "../../components/Loader";
import { StudentStatistic } from "../../components/StudentStatistic";
import { Paper, Typography } from "@mui/material";

export function StudentStatisticPage() {
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(true)
    const [error, setError] = useState(false)

    const loadData = () => {
        setLoader(true)
        let student = UrlService.param('student');
        HttpRequest.get(
            `/api/student/${student}/statistic/`,
            data => {
                setData(data);
                setLoader(false)
            },
            error => {
                setError(error)
                setLoader(false)
            }
        );
    }

    useEffect(() => {
        loadData();
    }, [])

    return <>
        <Notice message={error}/>
        <Loader show={loader}/>

        {
            data.fio
                ? <Typography variant="subtitle1" mt={3}>
                    {data.fio} <Typography variant={"caption"}>({data.email})</Typography>
                </Typography>
                : ''
        }
        <Paper sx={{ my: 3, width: '100%' }}>
            <StudentStatistic data={data.result}/>
        </Paper>
    </>;
}
