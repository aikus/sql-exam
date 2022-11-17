<?php

namespace App\Service\CheckRight\UseCase\Sql;

use App\Service\CheckRight\Domain\Answer;

class SqlAnswer implements Answer
{
    public function __construct(readonly private ?string $sqlQueryText)
    {
    }

    public function toString(): ?string
    {
        return $this->sqlQueryText;
    }
}