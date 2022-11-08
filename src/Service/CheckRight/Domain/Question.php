<?php

namespace App\Service\CheckRight\Domain;

class Question
{
    public function __construct(
        readonly private string $type,
        readonly private Answer $rightAnswer
    ) {
    }

    public function type(): string
    {
        return $this->type;
    }

    public function rightAnswer(): Answer
    {
        return $this->rightAnswer;
    }
}