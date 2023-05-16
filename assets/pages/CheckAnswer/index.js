import React, {useEffect, useState} from 'react';
import * as C from './styles';
import {H2} from '../../components/Typography';
import {Loader} from "../../components/Loader";
import {CheckAnswerRepository} from "./CheckAnswerRepository";
import {searchParam} from "../../Service/SearchParamActions";
import {AnswerChecker} from "./AnswerChecker";

const getSheet = () => searchParam.get('sheet'),
    getAnswer = () => searchParam.get('answer') || null;

export const CheckAnswer = () => {
    const repository = CheckAnswerRepository;
    const sheetId = getSheet();
    const [answerKey, setAnswerKey] = useState(0);
    const [answerList, setAnswerList] = useState([]);
    const [loader, setLoader] = useState(true);
    const setAnswerInList = (answer, key) => {
        const newList = [];
        for(let i = 0; i < answerList.length; i++) {
            newList[i] = key === i ? answer : answerList[i];
        }
        setAnswerList(newList);
    }

    useEffect(() => {
        if(answerList.length > 0) {
            return;
        }
        repository.getAnswerList(sheetId).then(result => {
            const answerId = getAnswer();
            setAnswerList(result);
            if (answerId) {
                for (let i = 0; i < result.length; i++) {
                    if (answerId == result[i].id) {
                        setAnswerKey(i);
                        break;
                    }
                }
            }
            setLoader(false);
        })
    });

    return (
        <C.Wrapper>
            <C.Header>
                <H2>Проверка ответа</H2>
            </C.Header>
            <C.Main>
                <Loader show={loader}/>
                {answerList.length > 0 && <AnswerChecker
                    answer={answerList[answerKey]}
                    answerPatch={answer => {
                        repository.saveAnswerResult(answer)
                        setAnswerInList(answer, answerKey);
                    }}
                    hasNext={answerKey < (answerList.length - 1)}
                    hasPrev={answerKey > 0}
                    toNext={() => setAnswerKey(answerKey + 1)}
                    toPrev={() => setAnswerKey(answerKey - 1)}
                />}
            </C.Main>
        </C.Wrapper>
    )
}
