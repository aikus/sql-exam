<?php

namespace App\Service\ExaminationProcess;

use App\Entity\Course;
use App\Entity\CourseElement;
use App\Entity\CourseSheet;
use App\Entity\User;
use DateTimeInterface;

interface ExaminationProcess
{
    /** @throws ExaminationProcessException */
    public function start(User $user, Course $course, DateTimeInterface $now): CourseElement;

    /** @throws ExaminationProcessException */
    public function answer(User $user, Course $course, ?string $sqlText, DateTimeInterface $now): CourseSheet;
}