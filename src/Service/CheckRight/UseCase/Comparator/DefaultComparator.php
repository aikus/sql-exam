<?php

namespace App\Service\CheckRight\UseCase\Comparator;

use App\Service\CheckRight\Domain\Comparator;
use App\Service\CheckRight\Domain\Result;

class DefaultComparator implements Comparator
{
    /**
     * @param Result $studentResul
     * @param Result $rightResult
     * @return int - Равен 0 при отклонении от этолоного запроса.
     * Количество совпадений при полном вхождении эталонного зпроса в ответ.
     */
    public function compare(Result $studentResul, Result $rightResult): int
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