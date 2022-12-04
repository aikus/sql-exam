import React, { useEffect, useState } from 'react';
import * as C from '/assets/styles/styles'
import { HttpRequest } from "/assets/Service/HttpRequest";
import { Notice } from "/assets/components/Notice";
import { Loader } from "/assets/components/Loader";
import {ReportTable} from "/assets/components/ReportTable";
import {Box} from "@mui/material";

export const Report = () => {

    const [reports, setReports] = useState({courses: {}})
    const [loader, setLoader] = useState(true)
    const [error, setError] = useState(false)

    const requestReport = () => {
        setLoader(true)
        HttpRequest.get(`/api-platform/courses`,
            data => {
                data.map(course => {
                    HttpRequest.get(`/api/course/${course.id}/report/`,
                        data => {
                            addReport(course.id, data)
                            setError(false)
                            setLoader(false)
                        },
                        error => {
                            setError(error)
                            setLoader(false)
                        }
                    );
                })
            },
            error => {
                setError(error)
                setLoader(false)
            });
    }

    const addReport = (courseId, report) => {
        let courseData = {courses: {}};
        courseData.courses = reports.courses;
        Object.keys(report.courses).map((course) => {
            courseData.courses[course] = report.courses[course];
        })
        setReports(courseData);
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
                Object.keys(reports.courses).map((courseApi) => {
                    return <Box my={3} key={reports.courses[courseApi].courseId}>
                        <ReportTable
                            title={reports.courses[courseApi].title}
                            courseId={reports.courses[courseApi].courseId}
                            rows={reports.courses[courseApi].data}
                        />
                    </Box>
                })
            }
        </C.Wrapper>
    )
}