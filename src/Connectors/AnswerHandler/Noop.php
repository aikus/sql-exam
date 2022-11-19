<?php

namespace App\Connectors\AnswerHandler;

use App\Entity\CourseAnswer;

class Noop implements Handler
{

    public function handle(CourseAnswer $answer)
    {
    }
}