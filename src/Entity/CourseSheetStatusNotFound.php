<?php

namespace App\Entity;

use Exception;

class CourseSheetStatusNotFound extends Exception
{
    public function __construct(?string $status)
    {
        if(null === $status) {
            $status = 'NULL';
        }
        parent::__construct("Status '$status' not found");
    }
}