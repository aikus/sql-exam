<?php

namespace App\Service\CheckRight\UseCase\Sql;

use App\Service\CheckRight\Domain\Answer;
use App\Service\CheckRight\Domain\Executor;
use App\Service\CheckRight\Domain\Result;

class SqlExecutor implements Executor
{

    public function exec(Answer $answer): Result
    {
        return new SqlResult([]);
    }
}