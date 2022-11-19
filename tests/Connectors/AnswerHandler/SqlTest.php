<?php

namespace App\Tests\Connectors\AnswerHandler;

use App\Connectors\AnswerHandler\Sql;
use App\Connectors\PdoConnection;
use App\Entity\CourseAnswer;
use App\Service\CheckRight\Domain\CheckRight;
use PHPUnit\Framework\TestCase;

class SqlTest extends TestCase
{
    /**
     * @dataProvider data_handle
     */
    public function test_handle(array $expected): void
    {
        $connection = $this->getMockBuilder(PdoConnection::class)
            ->disableOriginalConstructor()
            ->getMock();

        $answer = $this->getMockBuilder(CourseAnswer::class)
            ->onlyMethods(['setResult'])
            ->getMock();

        $answer->expects($this->once())
            ->method('setResult')
            ->with($expected);

        $answer->setAnswer('');

        $checkRight = $this->getMockBuilder(CheckRight::class)
            ->disableOriginalConstructor()
            ->getMock();

        $checkRight->expects($this->once())
            ->method('checkAnswer')
            ->with($answer);

        $handler = new Sql($connection, $checkRight);

        $handler->handle($answer);
    }

    public function data_handle(): array
    {
        return [
            [
                [
                    'error' => '',
                    'result' => [],
                    'header' => [],
                ]
            ]
        ];
    }
}