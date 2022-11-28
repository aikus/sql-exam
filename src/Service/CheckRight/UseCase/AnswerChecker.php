<?php

namespace App\Service\CheckRight\UseCase;

use App\Service\CheckRight\Domain\Comparator;
use App\Service\CheckRight\Domain\Executor;
use App\Service\CheckRight\Domain\Question;
use App\Service\CheckRight\Domain\StudentAnswer;
use App\Service\CheckRight\UseCase\Comparator\ComparatorFactory;

class AnswerChecker
{
    public const IS_NOT_RIGHT = 0;
    public const IS_RIGHT = 1;

    public function __construct(
        readonly private Executor $executor,
        readonly private ?string $comparatorType = null,
        private ?ComparatorFactory $factory = null
    ) {
        $this->factory = $factory ?? new ComparatorFactory();
    }

    public function calculate(Question $question, StudentAnswer $studentAnswer): int
    {
        return $this->factory->getComparator($this->comparatorType)->compare(
            $this->executor->studentExec($studentAnswer),
            $this->executor->teacherExec($question->rightAnswer())
        ) > 0 ? self::IS_RIGHT : self::IS_NOT_RIGHT;
    }
}