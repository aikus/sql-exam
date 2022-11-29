<?php

namespace App\Service\CheckRight;

use App\Connectors\PdoConnection;
use App\Entity\CourseAnswer;
use App\Service\CheckRight\Domain\CheckRight;
use App\Service\CheckRight\Domain\Comparator;
use App\Service\CheckRight\Domain\Question;
use App\Service\CheckRight\Domain\StudentAnswer;
use App\Service\CheckRight\UseCase\AnswerChecker;
use App\Service\CheckRight\UseCase\Sql\SqlAnswer;
use App\Service\CheckRight\UseCase\Sql\SqlExecutor;

class SqlCheckRight implements CheckRight
{
    public function __construct(
        private PdoConnection $connection,
    ) {
    }

    public function setConnection(PdoConnection $connection): self
    {
        $this->connection = $connection;
        return $this;
    }

    public function checkAnswer(CourseAnswer $answer, \DateTimeInterface $now = null): int
    {
        $question = $answer->getQuestion();

        // В будущем устанавливать алгоритм сравнения в зависимости от параметров вопроса
        $answerChecker = new AnswerChecker(new SqlExecutor($this->connection), Comparator::TYPE_FULL);

        return $answerChecker->calculate(
            new Question($question->getType(), new SqlAnswer($question->getAnswer())),
            new StudentAnswer(new SqlAnswer($answer->getAnswer()))
        );
    }
}