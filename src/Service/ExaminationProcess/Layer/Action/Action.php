<?php

namespace App\Service\ExaminationProcess\Layer\Action;

use App\Service\ExaminationProcess\Layer\Domain\ExaminationProcessException;
use App\Service\ExaminationProcess\Layer\Responder\Responder;

abstract class Action
{
    /** @throws ExaminationProcessException */
    public function run(): array
    {
        return $this->do()->response();
    }

    /** @throws ExaminationProcessException */
    abstract protected function do(): Responder;
}