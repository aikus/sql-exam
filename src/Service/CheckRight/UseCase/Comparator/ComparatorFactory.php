<?php

namespace App\Service\CheckRight\UseCase\Comparator;

use App\Service\CheckRight\Domain\Comparator;

class ComparatorFactory
{
    public function getComparator(?string $type): Comparator
    {
        if ($type === Comparator::TYPE_DEFAULT) {
            return new DefaultComparator();
        }

        elseif ($type === Comparator::TYPE_FULL) {
            return new FullComparator();
        }

        return new NullComparator();
    }
}