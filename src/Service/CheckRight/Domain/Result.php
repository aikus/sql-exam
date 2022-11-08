<?php

namespace App\Service\CheckRight\Domain;

interface Result
{
    public function isEmpty(): bool;

    public function toArray(): array;
}