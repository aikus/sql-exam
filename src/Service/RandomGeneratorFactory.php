<?php

namespace App\Service;

use RandomLib\Factory;
use RandomLib\Generator;
use SecurityLib\Strength;

class RandomGeneratorFactory
{
    public function __construct(private Factory $factory)
    {
    }

    public function getGenerator(): Generator
    {
        return $this->factory->getGenerator(new Strength(Strength::MEDIUM));
    }
}