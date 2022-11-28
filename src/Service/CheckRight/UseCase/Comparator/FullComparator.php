<?php

namespace App\Service\CheckRight\UseCase\Comparator;

use App\Service\CheckRight\Domain\Comparator;
use App\Service\CheckRight\Domain\Result;

class FullComparator implements Comparator
{

    public function compare(Result $studentResul, Result $rightResult): int
    {
        if ($rightResult->isEmpty() || $studentResul->isEmpty()) return 0;

        $rightResultTable = $rightResult->toArray();
        $studentResulTable = $studentResul->toArray();

        if (count($rightResultTable) !== count($studentResulTable)) return 0;

        $studentRightRowCount = 0;
        foreach ($rightResultTable as $rightRow) {
            $studentRightRowCount += $this->isRowInTable($rightRow, $studentResulTable);
        }

        if ($studentRightRowCount === count($studentResulTable)) {
            return 1;
        }

        return 0;
    }

    private function isRowInTable(array $rightRow, array $studentResulTable): int
    {
        foreach ($studentResulTable as $studentAnswerRow) {
            if (count($rightRow) > count($studentAnswerRow)) {
                return 0;
            }

            $studentRightColCount = 0;

            foreach ($rightRow as $rightCell) {
                foreach ($studentAnswerRow as $key => $studentAnswerCell) {
                    if ($this->compareCell($rightCell, $studentAnswerCell)) {
                        $studentRightColCount++;
                        unset($studentAnswerRow[$key]);
                        break;
                    }
                }
            }

            if ($studentRightColCount === count($rightRow)) {
                return 1;
            }
        }

        return 0;
    }

    private function compareCell($a, $b): bool
    {
        if (null === $a && null !== $b) {
            return false;
        }

        if (null === $b && null !== $a) {
            return false;
        }

        return (string) $a === (string) $b;
    }
}