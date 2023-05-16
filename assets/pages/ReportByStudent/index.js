import React, {useContext, useEffect, useState} from 'react';
import * as C from '/assets/styles/styles'
import { CourseResult } from "/assets/components/CourseResult";
import { HttpRequest } from "/assets/Service/HttpRequest";
import { UrlService } from "/assets/Service/UrlService";
import { Notice } from "/assets/components/Notice";
import { Loader } from "/assets/components/Loader";
import AuthContext from "../../context/AuthProvider";

export const ReportByStudent = () => {

    const [personalResult, setPersonalResult] = useState(false);
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState(false);
    const authContext = useContext(AuthContext).auth?.roles;
    const isTeacher = () => {
        if(!authContext) {
            return false;
        }
        for(let i = 0; i < authContext.length; i++) {
            if("ROLE_TEACHER" === authContext[i] || "ROLE_ADMIN" === authContext[i]) {
                return true;
            }
        }
        return false;
    }

    const requestSheetList = () => {
        setLoader(true)
        let courseId = UrlService.param('course');
        let userId = UrlService.param('student');
        HttpRequest.get(`/api/student/${userId}/course/${courseId}/result`,
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
        requestSheetList();
        // setIsTeacher(isTeacherFn());
    }, [])

    return (
        <C.Wrapper>
            <Notice message={error}/>
            <Loader show={loader}/>

            {
                personalResult &&
                <CourseResult personalResult={personalResult} isTeacher={isTeacher()}/>
            }
        </C.Wrapper>
    )
}