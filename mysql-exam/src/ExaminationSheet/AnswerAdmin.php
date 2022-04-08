<?php

namespace RusakovNikita\MysqlExam\ExaminationSheet;

use RusakovNikita\MysqlExam\Exam\Answer;
use RusakovNikita\MysqlExam\Exam\Question;

class AnswerAdmin
{
    public function __construct(private AnswerIdGenerator $generator, private AnswerRepository $repository, private SqlExec $exec)
    {
    }

    public function createAnswer(Question $question, \DateTimeInterface $now): Answer
    {
        return new Answer($this->generator->generateAnswerId(), $question, '', null, null, $now);
    }

    public function getAnswer(string $id): Answer
    {
        return $this->repository->get($id);
    }

    public function saveAnswer(Answer $answer): void
    {
        $this->repository->save($answer);
    }

    public function setVariant(Answer $answer, $sql, \DateTimeInterface $now): Answer
    {
        if($this->answerTimeout($answer, $now)) {
            throw new QuestionTimeOut();
        }

        $result = $this->exec->exec($sql);
        return $answer->setEnd($now)
            ->setError($result->getError())
            ->setTable($result->getResult())
            ->setSql($sql);
    }

    private function answerTimeout(Answer $answer, \DateTimeInterface $now): bool
    {
        $timeLimit = $answer->getQuestion()->getTimeLimit();
        if($timeLimit <= 0) {
            return false;
        }
        $diff = $now->getTimestamp() - $answer->getStart()->getTimestamp();
        return $diff > $timeLimit;
    }
}