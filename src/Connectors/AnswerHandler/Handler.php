<?php

namespace App\Connectors\AnswerHandler;

use App\Entity\CourseAnswer;

interface Handler
{
    public function handle(CourseAnswer $answer);
}