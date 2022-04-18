<?php

namespace App\Connectors;

use App\Entity\Answer;

class TimeLimitExam implements TimeLimitProvider
{
    public function __construct(private Answer $answer)
    {
    }

    public function getLimit(): int
    {
        return (int) $this->answer->getQuestion()->getExam()->getTimeLimit();
    }

    public function getStart(): \DateTimeInterface
    {
        $sheet = $this->answer->getExaminationSheet();
        $minDate = $this->answer->getStart();
        foreach ($sheet->getAnswers() as $answer) {
            if($answer->getStart() < $minDate) {
                $minDate = $answer->getStart();
            }
        }
        return $minDate;
    }
}