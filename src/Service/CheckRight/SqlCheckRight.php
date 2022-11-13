<?php

namespace App\Service\CheckRight;

use App\Connectors\PdoConnection;
use App\Entity\CourseAnswer;
use App\Entity\CourseSheet;
use App\Service\CheckRight\Domain\CheckRight;
use App\Service\CheckRight\Domain\Question;
use App\Service\CheckRight\Domain\StudentAnswer;
use App\Service\CheckRight\UseCase\AnswerChecker;
use App\Service\CheckRight\UseCase\Sql\SqlAnswer;
use App\Service\CheckRight\UseCase\Sql\SqlExecutor;

class SqlCheckRight implements CheckRight
{
    private AnswerChecker $answerChecker;

    public function __construct(
        private readonly PdoConnection $connection,
    ) {
        $this->answerChecker = new AnswerChecker(new SqlExecutor($this->connection));
    }

    public function checkAnswer(CourseAnswer $answer, \DateTimeInterface $now = null): int
    {
        $question = $answer->getQuestion();
        return $this->answerChecker->calculate(
            new Question($question->getType(), new SqlAnswer($question->getAnswer())),
            new StudentAnswer(new SqlAnswer($answer->getAnswer()))
        );
    }
}