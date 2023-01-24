<?php

namespace App\Service\CheckRight\UseCase\Sql;

use App\Connectors\PdoConnection;
use App\Service\CheckRight\Domain\Answer;
use App\Service\CheckRight\Domain\Executor;
use App\Service\CheckRight\Domain\Result;

class SqlExecutor implements Executor
{

    public function __construct(
        private readonly PdoConnection $connection
    ) {
    }

    public function teacherExec(Answer $answer): Result
    {
        return $this->exec($answer);
    }

    public function studentExec(Answer $answer): Result
    {
        return $this->exec($answer);
    }


    private function exec(Answer $answer): Result
    {
        return new SqlResult($this->connection->fetchAll($answer->toString()));
    }
}