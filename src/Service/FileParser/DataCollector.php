<?php

namespace App\Service\FileParser;

use Psr\Log\LoggerInterface;

abstract class DataCollector
{
    protected LoggerInterface $logger;

    protected array $entityContainer = [];

    protected array $relatedEntities = [];

    protected array $relatedPined = [];

    public function __construct(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }

    public function getEntityContainer(): array
    {
        return $this->entityContainer;
    }

    protected abstract function collect(
        array $table,
        string $entityName,
        int $index,
        string $method,
        string $value,
        ?string $relationEntity
    ): void;

    public function collectRelatedPined(string $entityName, string $mapMethod, string $method, $value): void
    {
        $this->relatedPined[$mapMethod] = new $entityName();
        if (method_exists($entityName, 'setCreateTime')) {
            $this->relatedPined[$mapMethod]->setCreateTime(new \DateTime());
        }
        $this->relatedPined[$mapMethod]->$method($value);
    }

    public function collectRelations(string $entityName, string $method, $value): void
    {
        $this->relatedEntities[$entityName] = new $entityName();
        if (method_exists($entityName, 'setCreateTime')) {
            $this->relatedEntities[$entityName]->setCreateTime(new \DateTime());
        }
        $this->relatedEntities[$entityName]->$method($value);
    }

    public function create(string $entityName, int $index, string $method, $value)
    {
        $entity = $this->find($entityName, $index);

        if (null === $entity) {
            $entity = $this->add($entityName, $index);
        }

        $entity->$method($value);

        return $entity;
    }

    private function find(string $entityName, int $index)
    {
        $entity = $this->relatedPined[$entityName] ?? null;
        $entity = $entity ?? $this->relatedPined[$entityName] ?? null;
        $entity = $entity ?? $this->entityContainer[$entityName]    [$index] ?? null;

        return $entity ?? null;
    }

    private function add(string $entityName, int $index)
    {
        $this->entityContainer[$entityName][$index] = new $entityName();
        $this->entityContainer[$entityName][$index]->setCreateTime(new \DateTime());
        return $this->entityContainer[$entityName][$index];
    }
}