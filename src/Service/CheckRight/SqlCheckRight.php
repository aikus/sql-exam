<?php

namespace App\Service\CheckRight;

use App\Entity\CourseSheet;
use App\Repository\CourseAnswerRepository;
use App\Repository\CourseSheetRepository;
use App\Service\CheckRight\Domain\Question;
use App\Service\CheckRight\Domain\StudentAnswer;
use App\Service\CheckRight\UseCase\AnswerChecker;
use App\Service\CheckRight\UseCase\Sql\SqlAnswer;

class SqlCheckRight
{
    public function __construct(
        readonly private AnswerChecker $answerChecker,
        readonly private CourseAnswerRepository $answerRepository,
        readonly private CourseSheetRepository $sheetRepository
    ) {
    }

    public function check(
        CourseSheet $sheet,
        \DateTimeInterface $now = null
    ): void {

        foreach ($sheet->getCourseAnswers()->toArray() as $answer) {

            $question = $answer->getQuestion();
            $result = $this->answerChecker->calculate(
                new Question($question->getType(), new SqlAnswer($question->getAnswer())),
                new StudentAnswer(new SqlAnswer($answer->getAnswer()))
            );

            $answer->setIsRight($result === AnswerChecker::IS_RIGHT);

            $this->answerRepository->add($answer);
        }
        $sheet->setUpdatedAt($now);
        $this->sheetRepository->add($sheet);
    }
}