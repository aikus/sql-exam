<?php

namespace App\Tests\Connectors\AnswerHandler;

use App\Connectors\CourseElementHandler\Sql;
use App\Connectors\PdoConnection;
use App\Entity\CourseElement;
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

        $element = $this->getMockBuilder(CourseElement::class)
            ->onlyMethods(['setAnswerExecutionResult'])
            ->getMock();

        $element->expects($this->once())
            ->method('setAnswerExecutionResult')
            ->with($expected);

        $element->setAnswer('');

        $handler = new Sql($connection);

        $handler->handle($element);
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