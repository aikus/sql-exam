import React, { useEffect, useState } from 'react';
import { UrlService } from "../../Service/UrlService";
import { HttpRequest } from "../../Service/HttpRequest";
import { Notice } from "../../components/Notice";
import { Loader } from "../../components/Loader";
import { Statistic } from "../../components/Chart/Statistic";

export function StatisticPage() {
    const [statistic, setStatistic] = useState({});
    const [loader, setLoader] = useState(true)
    const [error, setError] = useState(false)

    const init = () => {
        if (Object.keys(statistic).length !== 0) return;

        setLoader(true)
        let course = UrlService.param('course');
        HttpRequest.get(
            `/api/course/${course}/statistic/`,
            data => {
                setStatistic(data);
                setLoader(false)
            },
            error => {
                setError(error)
                setLoader(false)
            }
        );
    }

    useEffect(() => {
        init();
    }, [])

    return <>
        <Notice message={error}/>
        <Loader show={loader}/>

        <Statistic statistic={statistic} text={'Диаграмма зависимости количества правильных ответов от номера вопроса'}/>
    </>;
}
