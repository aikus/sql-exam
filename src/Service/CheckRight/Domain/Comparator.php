<?php

namespace App\Service\CheckRight\Domain;

interface Comparator
{
    public const TYPE_DEFAULT = 'default';
    public const TYPE_FULL = 'full';

    public function compare(Result $studentResul, Result $rightResult): int;
}