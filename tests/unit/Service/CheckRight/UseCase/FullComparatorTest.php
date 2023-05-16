<?php

namespace App\Tests\unit\Service\CheckRight\UseCase;

use App\Service\CheckRight\Domain\Result;
use App\Service\CheckRight\UseCase\Comparator\FullComparator;
use PHPUnit\Framework\TestCase;

class FullComparatorTest extends TestCase
{
    /**
     * @dataProvider data_compare
     * @param mixed $student
     * @param mixed $right
     * @param int $expects
     * @return void
     */
    public function test_compare(mixed $student, mixed $right, int $expects): void
    {
        $studentResult = $this->createResultObject([[$student]]);
        $rightResult = $this->createResultObject([[$right]]);
        $comparator = new FullComparator();

        self::assertEquals($expects, $comparator->compare($studentResult, $rightResult));
    }

    public function data_compare(): iterable
    {
        yield 'Case 0' => [-1, '-1', 1];
        yield 'Case 1' => [0, '0', 1];
        yield 'Case 2' => [42, '42', 1];
        yield 'Case 3' => [4.2, '4', 0];
        yield 'Case 4' => [4.2, '5', 0];
        yield 'Case 5' => [.42, '0', 0];
        yield 'Case 6' => [.42, '1', 0];
        yield 'Case 7' => [42., '42', 1];
        yield 'Case 8' => ["42", '42', 1];
        yield 'Case 9' => ["a42", '42', 0];
        yield 'Case 10' => ["42a", '42', 0];
        yield 'Case 11' => [0x24, '36', 1];
        yield 'Case 12' => [1337e0, '1337', 1];
    }

    private function createResultObject(array $toArray): Result
    {
        $result = $this->getMockBuilder(Result::class)
            ->onlyMethods(['isEmpty', 'toArray'])
            ->getMock();

        $result->expects($this->once())
            ->method('isEmpty')
            ->willReturn(false);

        $result->expects($this->once())
            ->method('toArray')
            ->willReturn($toArray);

        return $result;
    }
}