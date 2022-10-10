<?php

namespace App\Service\FileParser;

use App\Entity\Skill\SkillSummary;
use Doctrine\Persistence\ManagerRegistry;
use Psr\Log\LoggerInterface;

class DataCollector
{
    private LoggerInterface $logger;

    private array $entityContainer = [];

    private array $relatedEntities = [];

    private array $relatedPined = [];

    private \DateTimeInterface $now;

    private ManagerRegistry $managerRegistry;

    public function __construct(ManagerRegistry $managerRegistry, \DateTimeInterface $now, LoggerInterface $logger)
    {
        $this->managerRegistry = $managerRegistry;
        $this->now = $now;
        $this->logger = $logger;
    }

    public function getEntityContainer(): array
    {
        return $this->entityContainer;
    }

    public function collect(array $table, string $entityName, int $index, string $method, string $value, ?string $relationEntity): void
    {
        if (null !== $relationEntity) {
            $value = $this->relatedEntities[$relationEntity];
        }

        if ($entityName === SkillSummary::class) {
            foreach ($this->relatedPined as $pinedMapMethod => $pinedEntity) {
                $this->create($entityName, $index, $pinedMapMethod, $pinedEntity);
            }
        }

        $this->create($entityName, $index, $method, $value);
    }

    public function collectRelatedPined(string $entityName, string $mapMethod, string $method, $value): void
    {
        $this->relatedPined[$mapMethod] = new $entityName($this->now);
        if (method_exists($entityName, 'setCreateTime')) {
            $this->relatedPined[$mapMethod]->setCreateTime($this->now);
        }
        $this->relatedPined[$mapMethod]->$method($value);
    }

    public function collectRelations(string $entityName, string $method, $value): void
    {
        $this->relatedEntities[$entityName] = new $entityName($this->now);
        if (method_exists($entityName, 'setCreateTime')) {
            $this->relatedEntities[$entityName]->setCreateTime($this->now);
        }
        $this->relatedEntities[$entityName]->$method($value);
    }

    public function create(string $entityName, int $index, string $method, $value)
    {
        $entity = $this->find($entityName, $value);

        if (null === $entity) {
            $entity = $this->add($entityName, $index);
        }

        $entity->$method($value);

        return $entity;
    }

    private function find(string $entityName, $value)
    {
        $repository = $this->managerRegistry->getRepository($entityName);

        // TODO: сделать подбор нужного объекта
        return $repository->findOneBy([]);
    }

    private function add(string $entityName, int $index)
    {
        $this->entityContainer[$entityName][$index] = new $entityName($this->now);
        if (method_exists($entityName, 'setCreateTime')) {
            $this->entityContainer[$entityName][$index]->setCreateTime($this->now);
        }
        return $this->entityContainer[$entityName][$index];
    }
}