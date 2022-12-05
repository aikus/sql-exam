<?php

namespace App\Connectors\CourseElementHandler;

use App\Entity\CourseElement;

interface Handler
{
    public function handle(CourseElement $answer);
}