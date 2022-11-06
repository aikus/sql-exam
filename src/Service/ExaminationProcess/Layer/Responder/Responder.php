<?php

namespace App\Service\ExaminationProcess\Layer\Responder;

abstract class Responder
{
    abstract public function response(): array;
}