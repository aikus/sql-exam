<?php

namespace App\Service\ExaminationProcess;

use App\Entity\Course;
use App\Entity\CourseElement;
use App\Entity\User;
use DateTimeInterface;

interface ExaminationProcess
{
    public function start(User $user, Course $course, DateTimeInterface $now): array;

    public function next(User $user, Course $course, DateTimeInterface $now): array;
}