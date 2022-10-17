<?php

namespace App\Entity;

use Exception;

class CourseElementTypeNotFound extends Exception
{
    public function __construct(string $type)
    {
        parent::__construct("Type '$type' not found");
    }
}