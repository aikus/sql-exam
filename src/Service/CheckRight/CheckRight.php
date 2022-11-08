<?php

namespace App\Service\CheckRight;

use App\Entity\Answer;
use App\Entity\RightAnswer;
use DateTimeInterface;

class CheckRight
{
    private function compare(RightAnswer $rightAnswer, Answer $answer): string
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
        }

        return $result > 0 ? '1' : '0';
    }

    public function getCheckedAnswer(
        Answer $answer,
        DateTimeInterface $now = null
    ): Answer {

        $answer->setCheckRight(
            $this->compare(
                // TODO: написать поиск в соответствии с драйвером БД
                $answer->getQuestion()->getRightAnswers()->last(),
                $answer
            )
        );

        if (null !== $now) {
            $answer->setEnd($now);
        }

        return $answer;
    }
}