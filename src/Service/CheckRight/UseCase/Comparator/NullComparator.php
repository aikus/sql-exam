<?php

namespace App\Service\CheckRight\UseCase\Comparator;

use App\Service\CheckRight\Domain\Comparator;
use App\Service\CheckRight\Domain\Result;

class NullComparator implements Comparator
{

    public function compare(Result $studentResul, Result $rightResult): int
    {
        return 0;
    }
}