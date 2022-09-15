<?php

namespace App\Service\FileParser;

use App\Entity\Skill;
use App\Entity\SkillSummary;
use Psr\Log\LoggerInterface;

class CollectorFactory
{
    private LoggerInterface $logger;

    private array $container;

    public function __construct(LoggerInterface $logger)
    {
        $this->logger = $logger;
        $this->container = [
            Skill::class => new SkillCollector($this->logger),
            SkillSummary::class => new SkillSummaryCollector($this->logger),
        ];
    }

    public function create(string $entityName): ?DataCollector
    {
        return $this->container[$entityName] ?: null;
    }
}