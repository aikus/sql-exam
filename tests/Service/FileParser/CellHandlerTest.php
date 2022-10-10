<?php

namespace App\Tests\Service\FileParser;

use App\Entity\Skill\Skill;
use App\Entity\Skill\SkillQuarter;
use App\Entity\Skill\SkillSummary;
use App\Entity\Skill\SkillValue;
use App\Service\FileParser\CellHandler;
use App\Service\FileParser\CollectorFactory;
use App\Service\FileParser\DataCollector;
use DateTime;
use Doctrine\Persistence\ManagerRegistry;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

/**
 * @group FileParser
 */
class CellHandlerTest extends TestCase
{
    /**
     * @dataProvider data_process_skill
     * @dataProvider data_process_quarter
     */
    public function test_process(
        int $rowNum,
        int $colNum,
        string $cellValue,
        array $table,
        \DateTimeInterface $now,
        array $expected
    ): void {

        $manager = $this->getMockBuilder(ManagerRegistry::class)
            ->getMock();

        $logger = $this->getMockBuilder(LoggerInterface::class)
            ->getMock();

        $collectorFactory = $this->getMockBuilder(CollectorFactory::class)
            ->onlyMethods(['create'])
            ->disableOriginalConstructor()
            ->getMock();

        $collectorFactory->expects($this->once())
            ->method('create')
            ->willReturn(new DataCollector($manager, $now, $logger));

        $cellHandler = new CellHandler($collectorFactory);
        $cellHandler->process($rowNum, $colNum, $cellValue, $table);
        self::assertEquals($expected, $cellHandler->getEntityContainer());
    }

    public function data_process_skill(): iterable
    {
        $now = new DateTime();
        $cellValue = 'JSA 1.1';

        yield [
            4, 10, $cellValue, [4 => [10 => $cellValue]], $now,
            [
                Skill::class => [
                    10 => $this->mockSkill($now, $cellValue),
                ]
            ]
        ];
    }

    public function data_process_quarter(): iterable
    {
        $now = new DateTime();
        $cellValue = '2 - практика';
        $params = [
            'quarter' => '2021-3Q',
            'user' => 'Андреев Владимир Сергеевич',
            'skill' => 'JSA 1.1',
        ];

        yield [
            5,
            4,
            $cellValue,
            [
                0 => ['', '', '', '', $params['skill']],
                5 => [$params['quarter'], $params['user'], 'верифицировано', 'Виктория Глушановская', $cellValue],
            ],
            $now,
            [
                SkillSummary::class => [
                    5 => $this->mockSkillSummary($now, $params, $cellValue),
                ]
            ]
        ];
    }

    private function mockSkill(\DateTimeInterface $now, string $cellValue): Skill
    {
        $skill = new Skill($now);
        $skill->setCreateTime($now);
        $skill->setCheckType($cellValue);

        return $skill;
    }

    private function mockSkillSummary(\DateTimeInterface $now, array $params, string $cellValue): SkillSummary
    {
        $skillSummary = new SkillSummary($now);
        $skillSummary->setQuarter((new SkillQuarter($now))->setAlias($params['quarter'])->setCreateTime($now));
        $skillSummary->setSkill((new Skill($now))->setAlias($params['skill'])->setCreateTime($now));
        $skillSummary->setSkillValue((new SkillValue($now))->setValue($cellValue)->setCreateTime($now));
        $skillSummary->setCreateTime($now);

        return $skillSummary;
    }

    private function mockQuarter(array $params)
    {
        $skillQuarter = new SkillQuarter();
        $skillQuarter->setAlias($params['alias']);
        $skillQuarter->setUser($params['user']);
        $skillQuarter->setTeam($params['team']);
        $skillQuarter->setReviewer($params['reviewer']);
        $skillQuarter->setStatus($params['status']);
    }
}