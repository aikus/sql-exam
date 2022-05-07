<?php

namespace App\Service\CheckRight;

use App\Entity\Answer;
use App\Entity\RightAnswer;

class CheckRight
{
    public function run(RightAnswer $rightAnswer, Answer $answer): string
    {
        $result = 0;
        $answer = $answer->getResultTable();
        $rightAnswer = $rightAnswer->getResult();

        if (null === $rightAnswer || null === $answer) return 0;

        if (count($rightAnswer) !== count($answer)) return 0;

        foreach ($rightAnswer as $key => $rightRow) {
            $answerRow = $answer[$key];

            if (count($rightRow) > count($answerRow)) return 0;

            $resultRow = 0;
            foreach ($rightRow as $rightCol) {
                if (in_array($rightCol, $answerRow)) $resultRow++;
            }

            if ($resultRow < count($answerRow)) return 0;
            else $result++;

//            $resultRow = array_intersect(
//                array_filter($rightRow ?? []),
//                array_filter($answerRow ?? [])
//            );
//
//            if ($rightRow == $resultRow) $result++;
        }

        return $result > 0 ? 1 : 0;
    }
}