<?php

namespace App\Connectors\CourseElementHandler;

use App\Entity\CourseElement;

class Noop implements Handler
{

    public function handle(CourseElement $element)
    {
    }
}