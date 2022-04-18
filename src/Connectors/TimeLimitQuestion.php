<?php

namespace App\Connectors;

use App\Entity\Answer;

class TimeLimitQuestion implements TimeLimitProvider
{
    public function __construct(private Answer $answer)
    {
    }

    public function getLimit(): int
    {
        return (int) $this->answer->getQuestion()->getTimeLimit();
    }

    public function getStart(): \DateTimeInterface
    {
        return $this->answer->getStart();
    }
}