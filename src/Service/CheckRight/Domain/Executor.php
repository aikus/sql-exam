<?php

namespace App\Service\CheckRight\Domain;

interface Executor
{
    public function exec(Answer $answer): Result;
}