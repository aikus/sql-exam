<?php

namespace App\Service\ExaminationProcess;

use App\Entity\CourseElement;
use App\Entity\CourseSheet;

class Response
{
    public function __construct(
        readonly public ?CourseSheet $sheet,
        readonly public ?CourseElement $currentElement,
        readonly public ?CourseElement $nextElement
    ) {
    }
}