<?php

namespace App\Service\ExaminationProcess;

use App\Entity\Course;
use App\Entity\CourseAnswer;
use App\Entity\CourseElement;
use App\Entity\CourseSheet;
use App\Entity\User;
use App\Repository\CourseAnswerRepository;
use App\Repository\CourseSheetRepository;
use DateTimeInterface;

class EntityCreator
{
    public function __construct(
        private readonly CourseSheetRepository $sheetRepository,
        private readonly CourseAnswerRepository $answerRepository,
    ) {
    }

    public function createSheet(
        Course $course,
        User $user,
        CourseElement $actualElement,
        DateTimeInterface $now
    ): CourseSheet {

        $sheet = new CourseSheet();
        $sheet->setCourse($course);
        $sheet->setStudent($user);
        $sheet->setActualElement($actualElement);
        $sheet->setUpdatedAt($now);
        $sheet->setCreatedAt($now);

        $this->sheetRepository->add($sheet);
        return $sheet;
    }

    public function createAnswer(
        CourseSheet $sheet,
        CourseElement $element,
        string $textAnswer
    ): CourseAnswer {

        $answer = new CourseAnswer();
        $answer->setCourceSheet($sheet);
        $answer->setQuestion($element);
        $answer->setAnswer($textAnswer);

        $this->answerRepository->add($answer);
        return $answer;
    }

    public function updateSheet(CourseSheet $sheet): CourseSheet
    {
        $this->sheetRepository->add($sheet);
        return $sheet;
    }

    public function findSheet(array $criteria): ?CourseSheet
    {
        return $this->sheetRepository->findOneBy($criteria);
    }
}