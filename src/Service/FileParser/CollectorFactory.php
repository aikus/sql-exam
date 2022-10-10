<?php

namespace App\Service\FileParser;

use App\Entity\Skill\Skill;
use App\Entity\Skill\SkillSummary;
use Doctrine\Persistence\ManagerRegistry;
use Psr\Log\LoggerInterface;

class CollectorFactory
{
    private LoggerInterface $logger;

    private array $container;

    public function __construct(ManagerRegistry $managerRegistry, LoggerInterface $logger)
    {
        $this->logger = $logger;
        $this->container = [
            Skill::class => new DataCollector(
                $managerRegistry,
                new \DateTime(),
                $this->logger
            ),
        ];
    }

    public function create(string $entityName): ?DataCollector
    {
        return $this->container[$entityName] ?: null;
    }
}