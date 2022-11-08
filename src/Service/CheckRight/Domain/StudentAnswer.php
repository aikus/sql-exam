<?php

namespace App\Service\CheckRight\Domain;

class StudentAnswer implements Answer
{
    public function __construct(private readonly Answer $answer)
    {
    }

    public function toString(): string
    {
        return $this->answer->toString();
    }
}