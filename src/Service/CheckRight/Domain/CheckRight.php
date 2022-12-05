<?php

namespace App\Service\CheckRight\Domain;

use App\Connectors\PdoConnection;
use App\Entity\CourseAnswer;

interface CheckRight
{
    public function setConnection(PdoConnection $connection): self;

    public function checkAnswer(CourseAnswer $answer, \DateTimeInterface $now = null): int;
}