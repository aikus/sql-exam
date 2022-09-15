<?php

namespace App\Service\FileParser;

class SkillCollector extends DataCollector
{
    public function collect(array $table, string $entityName, int $index, string $method, string $value, ?string $relationEntity): void
    {
        if (null !== $relationEntity) {
            $value = $this->relatedEntities[$relationEntity];
        }

        $this->create($entityName, $index, $method, $value);
    }
}