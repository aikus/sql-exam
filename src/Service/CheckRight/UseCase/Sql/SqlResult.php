<?php

namespace App\Service\CheckRight\UseCase\Sql;

use App\Service\CheckRight\Domain\Result;

class SqlResult implements Result
{

    public function __construct(readonly private array $result)
    {
    }

    public function isEmpty(): bool
    {
        return empty($this->result);
    }

    public function toArray(): array
    {
        return $this->result;
    }
}