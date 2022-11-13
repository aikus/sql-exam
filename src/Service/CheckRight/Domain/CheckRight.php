<?php

namespace App\Service\CheckRight\Domain;

use App\Entity\CourseAnswer;

interface CheckRight
{
    public function checkAnswer(CourseAnswer $answer, \DateTimeInterface $now = null): int;
}