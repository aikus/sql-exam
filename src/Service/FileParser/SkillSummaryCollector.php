<?php

namespace App\Service\FileParser;

use App\Entity\SkillSummary;

class SkillSummaryCollector extends DataCollector
{
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
}