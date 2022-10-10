<?php

namespace App\Service\FileParser;

use App\Entity\Skill\Skill;
use App\Entity\Skill\SkillCategory;
use App\Entity\Skill\SkillQuarter;
use App\Entity\Skill\SkillSummary;
use App\Entity\Skill\SkillValue;
use Exception;

class CellHandler
{
    private const DIRECTION_FROM_LEFT_TO_RIGHT = 'from_left_to_right';

    private const DIRECTION_FROM_TOP_TO_DOWN = 'from_top_to_down';

    private DataCollector $collector;

    private array $mapConfigs = [
        Skill::class => [
            'direction' => self::DIRECTION_FROM_LEFT_TO_RIGHT,
            'start' => ['row' => 0, 'col' => 4],
            'end' => ['row' => 4, 'col' => 22],
            'mapMethod' => ['setAlias', 'setCategory', 'setName', 'setDescription', 'setCheckType'],
            'relations' => ['setCategory' => ['name' => SkillCategory::class, 'mapMethod' => 'setName']],
        ],
        SkillSummary::class => [
            'direction' => self::DIRECTION_FROM_TOP_TO_DOWN,
            'start' => ['row' => 5, 'col' => 0],
            'end' => ['row' => 11, 'col' => 4],
            'mapMethod' => ['setSkillValue'],
            'pined' => [
                [
                    'name' => Skill::class,
                    'method' => 'setAlias',
                    'type' => 'top',
                    'row' => 0,
                    'mapMethod' => 'setSkill',
                ],
                [
                    'name' => SkillQuarter::class,
                    'method' => 'setAlias',
                    'type' => 'left',
                    'col' => 0,
                    'mapMethod' => 'setQuarter',
                ],
            ],
            'relations' => [
                'setSkillValue' => ['name' => SkillValue::class, 'mapMethod' => 'setValue'],
            ],
        ],
    ];

    public function __construct(CollectorFactory $collectorFactory)
    {
        $this->collector = $collectorFactory->create(Skill::class);
    }

    public function getEntityContainer(): array
    {
        return $this->collector->getEntityContainer();
    }

    /** @throws Exception */
    public function process(int $rowNum, int $colNum, string $cellValue, array $table): void
    {
        foreach ($this->mapConfigs as $entityName => $mapConfig) {

            if ($this->isTargetCell($mapConfig, $rowNum, $colNum)) {

                $index = $this->resolveIndex($colNum, $rowNum, $mapConfig['direction']);

                foreach ($mapConfig['pined'] ?? [] as $pinedConfig) {
                    $this->collector->collectRelatedPined(
                        $pinedConfig['name'],
                        $pinedConfig['mapMethod'],
                        $pinedConfig['method'],
                        $table[$pinedConfig['row'] ?? $rowNum][$pinedConfig['col'] ?? $colNum]
                    );
                }

                $method = $mapConfig['mapMethod'][$rowNum - $mapConfig['start']['row']] ?? null;

                $relation = $this->getRelation($mapConfig, $method);

                if (null !== $relation) {
                    $this->collector->collectRelations($relation['name'], $relation['mapMethod'], $cellValue);
                }

                $this->collector->collect($table, $entityName, $index, $method, $cellValue, $relation['name'] ?? null);
            }
        }
    }

    private function resolveIndex(int $rowNum, int $colNum, string $direction): int
    {
        $indexes = [
            self::DIRECTION_FROM_LEFT_TO_RIGHT => $colNum,
            self::DIRECTION_FROM_TOP_TO_DOWN => $rowNum,
        ];

        return $indexes[$direction] ?? $colNum;
    }

    private function isTargetCell(array $mapConfig, int $rowNum, int $colNum): bool
    {
        return $mapConfig['start']['row'] <= $rowNum
            && $mapConfig['start']['col'] <= $colNum
            && $mapConfig['end']['row'] >= $rowNum
            && $mapConfig['end']['col'] >= $colNum;
    }

    private function getRelation(array $mapConfig, string $method): ?array
    {
        $relations = $mapConfig['relations'] ?? [];
        return $relations[$method] ?? null;
    }
}