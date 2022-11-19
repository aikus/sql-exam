import React, { useEffect, useState } from 'react';
import * as C from '/assets/styles/styles'
import { CourseResult } from "/assets/components/CourseResult";
import { HttpRequest } from "/assets/Service/HttpRequest";
import { UrlService } from "/assets/Service/UrlService";
import { Notice } from "/assets/components/Notice";
import { Loader } from "/assets/components/Loader";

export const PersonalCourseResult = () => {

    const [personalResult, setPersonalResult] = useState({})
    const [loader, setLoader] = useState(true)
    const [error, setError] = useState(false)

    const requestSheetList = () => {
        setLoader(true)
        let course = UrlService.param('course');
        HttpRequest.get(`/api/course/${course}/result`,
            data => {
                setPersonalResult(data)
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
        requestSheetList()
    }, [])

    return (
        <C.Wrapper>
            <Notice message={error}/>
            <Loader show={loader}/>

            <CourseResult personalResult={personalResult}/>
        </C.Wrapper>
    )
}