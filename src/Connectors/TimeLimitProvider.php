<?php

namespace App\Connectors;

interface TimeLimitProvider
{
    public function getLimit(): int;
    public function getStart(): \DateTimeInterface;
}