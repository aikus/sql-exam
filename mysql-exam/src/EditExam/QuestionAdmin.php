<?php

namespace RusakovNikita\MysqlExam\EditExam;

use RusakovNikita\MysqlExam\Exam\Question;

class QuestionAdmin
{
    public function __construct(private QuestionIdGenerator $generator, private QuestionRepository $repository)
    {
    }

    public function createQuestion(string $content, int $timeLimit, int $order): Question
    {
        return new Question($this->generator->generateQuestionId(), $content, $order);
    }

    public function setQuestion(Question $question, string $content, int $timeLimit, int $order): void
    {
        $this->repository->saveQuestion($question->setContent($content)
            ->setTimeLimit($timeLimit)
            ->setOrd($order));
    }
}