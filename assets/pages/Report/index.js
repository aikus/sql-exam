import React, { useEffect, useState } from 'react';
import * as C from '/assets/styles/styles'
import { HttpRequest } from "/assets/Service/HttpRequest";
import { Notice } from "/assets/components/Notice";
import { Loader } from "/assets/components/Loader";
import {ReportTable} from "/assets/components/ReportTable";
import {Box} from "@mui/material";

export const Report = () => {

    const [reports, setReports] = useState({})
    const [loader, setLoader] = useState(true)
    const [error, setError] = useState(false)

    const requestReport = () => {
        setLoader(true)
        HttpRequest.get(`/api/report`,
            data => {
                setReports(data)
                setError(false)
                setLoader(false)
            },
            error => {
                setError(error)
                setLoader(false)
            }
        );
    }

    useEffect(() => {
        requestReport()
    }, [])

    return (
        <C.Wrapper>
            <Notice message={error}/>
            <Loader show={loader}/>

            {
                reports?.courses &&
                Object.keys(reports.courses).map((report) => {
                    return <Box my={3}>
                        <p>{reports.courses[report].header}</p>
                        <ReportTable report={reports.courses[report].data}/>
                    </Box>
                })
            }
        </C.Wrapper>
    )
}