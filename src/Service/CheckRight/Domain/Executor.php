<?php

namespace App\Service\CheckRight\Domain;

interface Executor
{
    public function teacherExec(Answer $answer): Result;
    public function studentExec(Answer $answer): Result;
}