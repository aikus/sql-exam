<?php

namespace App\Connectors;

class TimeLimitCalculator
{
    public function __construct(private \DateTimeInterface $now)
    {
    }

    public function getLimit(TimeLimitProvider $provider): int
    {
        if($provider->getLimit()) {
            return $provider->getLimit() - ($this->now->format('U') - $provider->getStart()->format('U'));
        }
        return 0;
    }
}