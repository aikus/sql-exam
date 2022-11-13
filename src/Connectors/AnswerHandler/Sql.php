<?php

namespace App\Connectors\AnswerHandler;

use App\Connectors\PdoConnection;
use App\Entity\CourseAnswer;
use App\Service\CheckRight\Domain\CheckRight;
use App\Service\CheckRight\UseCase\AnswerChecker;
use Exception;

class Sql implements Handler
{
    public function __construct(
        private readonly PdoConnection $connection,
        private readonly CheckRight $sqlCheckRight
    ) {
    }

    public function handle(CourseAnswer $answer)
    {
        try {
            $result = $this->connection->fetchAll($answer->getAnswer());
            $answer->setResult([
                'error' => '',
                'result' => $result,
                'header' => $this->connection->getColumnMeta(),
            ]);
            $answer->setIsRight(AnswerChecker::IS_RIGHT === $this->sqlCheckRight->checkAnswer($answer));
        } catch (Exception $exception) {
            $answer->setResult([
                'error' => $exception->getMessage(),
                'result' => [],
                'header' => [],
                'trace' => $exception->getTrace()
            ]);
        }
    }
}