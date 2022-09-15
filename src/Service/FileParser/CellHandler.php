<?php

namespace App\Service\FileParser;

use App\Entity\Skill;
use App\Entity\SkillCategory;
use App\Entity\SkillQuarter;
use App\Entity\SkillSummary;
use App\Entity\SkillValue;
use App\Entity\User;
use Exception;

class CellHandler
{
    private const DIRECTION_FROM_LEFT_TO_RIGHT = 'from_left_to_right';

    private const DIRECTION_FROM_TOP_TO_DOWN = 'from_top_to_down';

    private array $entityCollectors;

    private CollectorFactory $collectorFactory;

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
                [
                    'name' => User::class,
                    'method' => 'setFio',
                    'type' => 'left',
                    'col' => 1,
                    'mapMethod' => 'setUser',
                ],
            ],
            'relations' => [
                'setSkillValue' => ['name' => SkillValue::class, 'mapMethod' => 'setValue'],
            ],
        ],
    ];

    public function __construct(CollectorFactory $collectorFactory)
    {
        $this->collectorFactory = $collectorFactory;
    }

    public function getEntityContainer(): array
    {
        return $this->entityCollectors;
    }

    /** @throws Exception */
    public function process(int $rowNum, int $colNum, string $cellValue, array $table): void
    {
        $collector = $this->collectorFactory->create(SkillSummary::class);

        foreach ($this->mapConfigs as $entityName => $mapConfig) {

            $pinedConfigList = $mapConfig['pined'] ?? [];

            foreach ($pinedConfigList as $pinedConfig) {
                $collector->collectRelatedPined(
                    $pinedConfig['name'],
                    $pinedConfig['mapMethod'],
                    $pinedConfig['method'],
                    $table[$pinedConfig['row'] ?? $rowNum][$pinedConfig['col'] ?? $colNum]
                );
            }

            if (
                $mapConfig['start']['row'] <= $rowNum
                && $mapConfig['start']['col'] <= $colNum
                && $mapConfig['end']['row'] >= $rowNum
                && $mapConfig['end']['col'] >= $colNum
            ) {
                $indexes = [
                    self::DIRECTION_FROM_LEFT_TO_RIGHT => $colNum,
                    self::DIRECTION_FROM_TOP_TO_DOWN => $rowNum,
                ];

                $index = $indexes[$mapConfig['direction']] ?? null;

                $method = $mapConfig['mapMethod'][$rowNum - $mapConfig['start']['row']] ?? null;

                $relation = $this->getRelation($mapConfig, $method);

                if (null !== $relation) {
                    $collector->collectRelations($relation['name'], $relation['mapMethod'], $cellValue);
                }

                $collector->collect($table, $entityName, $index, $method, $cellValue, $relation['name'] ?? null);

                $this->entityCollectors[$entityName] = $collector->getEntityContainer();
            }
        }
    }

    private function getRelation(array $mapConfig, string $method): ?array
    {
        $relations = $mapConfig['relations'] ?? [];
        return $relations[$method] ?? null;
    }
}