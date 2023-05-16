<?php

namespace App\Tests\unit\Service\CheckRight\UseCase;

use App\Service\CheckRight\Domain\Comparator;
use App\Service\CheckRight\Domain\Executor;
use App\Service\CheckRight\Domain\Question;
use App\Service\CheckRight\Domain\StudentAnswer;
use App\Service\CheckRight\UseCase\AnswerChecker;
use App\Service\CheckRight\UseCase\Sql\SqlResult;
use PHPUnit\Framework\TestCase;

class AnswerCheckerTest extends TestCase
{
    /**
     * @dataProvider data_full_comparator
     * @param array $rightResult
     * @param array $studentResult
     * @param int $expected
     * @return void
     */
    public function test_full_comparator(array $rightResult, array $studentResult, int $expected): void
    {
        $question = $this->getMockBuilder(Question::class)
            ->disableOriginalConstructor()
            ->getMock();

        $studentAnswer = $this->getMockBuilder(StudentAnswer::class)
            ->disableOriginalConstructor()
            ->getMock();

        $answerChecker = new AnswerChecker(
            $this->executor($rightResult, $studentResult),
            Comparator::TYPE_FULL
        );

        self::assertEquals($expected, $answerChecker->calculate($question, $studentAnswer));
    }

    public function data_full_comparator(): array
    {
        return [
            'Одинаковы. Идентичные массивы' => [
                [[1,2,3]],
                [[1,2,3]],
                1
            ],
            'Одинаковы. Идентичные массивы 2' => [
                [[1,2,3]],
                [['1','2','3']],
                1
            ],
            'Одинаковы. Столбцы в обратном порядке' => [
                [[1,2,3]],
                [[3,2,1]],
                1
            ],
            'Одинаковы. Строки в обратном порядке' => [
                [
                    [7,8,9],
                    [4,5,6],
                    [1,2,3],
                ],
                [
                    [1,2,3],
                    [4,5,6],
                    [7,8,9],
                ],
                1
            ],
            'Не одинаковы. 0 не равен пустой строке' => [
                [['']], [[0]], 0
            ],
            'Не одинаковы. Пустая строка не равна 0' => [
                [[0]], [['']], 0
            ],
            'Не одинаковы. 0 не равен NULL' => [
                [[null]], [[0]], 0
            ],
            'Не одинаковы. NULL не равен 0' => [
                [[0]], [[null]], 0
            ],
            'Не одинаковы. NULL не равен пустой строке' => [
                [['']], [[null]], 0
            ],
            'Не одинаковы. Пустая строка не равна NULL' => [
                [[null]], [['']], 0
            ],
            'Не одинаковы. У студента есть правильное значение, но остальные не верны' => [
                [[1,2,3]],
                [[1,1,1]],
                0
            ],
            'Не одинаковы. У студента только одно правильное значение' => [
                [[1,1,1]],
                [[1,2,3]],
                0
            ],
            'Не одинаковы. Во втором элементе втрой строки' => [
                [
                    [7,8,9],
                    [4,5,6],
                    [1,2,3],
                ],
                [
                    [1,2,3],
                    [4,2,6],
                    [7,8,9],
                ],
                0
            ],
            'Не одинаковы. У студента только одно правильное значение во второй строке 1' => [
                [
                    [7,8,9],
                    [4,5,6],
                    [1,2,3],
                ],
                [
                    [1,2,3],
                    [4,4,4],
                    [7,8,9],
                ],
                0
            ],
            'Не одинаковы. У студента только одно правильное значение во второй строке 2' => [
                [
                    [7,8,9],
                    [4,4,4],
                    [1,2,3],
                ],
                [
                    [1,2,3],
                    [4,5,6],
                    [7,8,9],
                ],
                0
            ],
        ];
    }

    private function executor(array $rightResult, array $studentResult): Executor
    {
        $executor = $this->getMockBuilder(Executor::class)
            ->onlyMethods(['teacherExec', 'studentExec'])
            ->getMock();

        $executor->expects($this->any())
            ->method('teacherExec')
            ->willReturn(new SqlResult($rightResult));

        $executor->expects($this->any())
            ->method('studentExec')
            ->willReturn(new SqlResult($studentResult));

        return $executor;
    }
}