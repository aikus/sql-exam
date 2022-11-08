<?php

namespace App\Service\CheckRight\UseCase;

use App\Service\CheckRight\Domain\Executor;
use App\Service\CheckRight\Domain\Question;
use App\Service\CheckRight\Domain\Result;
use App\Service\CheckRight\Domain\StudentAnswer;

class AnswerChecker
{
    public const IS_NOT_RIGHT = 0;
    public const IS_RIGHT = 1;

    public function __construct(readonly private Executor $executor)
    {
    }

    public function calculate(Question $question, StudentAnswer $studentAnswer): int
    {
        $type = $question->type();
        return $this->compare(
            $this->executor->exec($question->rightAnswer()),
            $this->executor->exec($studentAnswer)
        ) > 0 ? self::IS_RIGHT : self::IS_NOT_RIGHT;
    }

    /**
     * @param Result $studentResul
     * @param Result $rightResult
     * @return int - 0 при отклонении от этолоного запроса,
     *               количество совпадений при полном вхождении эталонного зпроса в ответ
     */
    private function compare(Result $studentResul, Result $rightResult): int
    {
        $result = 0;

        if ($rightResult->isEmpty() || $studentResul->isEmpty()) return 0;

        $rightResultTable = $rightResult->toArray();
        $studentResulTable = $studentResul->toArray();

        if (count($rightResultTable) !== count($studentResulTable)) return 0;

        foreach ($rightResultTable as $key => $rightRow) {
            $answerRow = $studentResulTable[$key];

            if (count($rightRow) > count($answerRow)) return 0;

            $resultRow = 0;
            foreach ($rightRow as $rightCol) {
                if (in_array($rightCol, $answerRow)) $resultRow++;
            }

            if ($resultRow < count($answerRow)) return 0;
            else $result++;
        }

        return $result;
    }
}