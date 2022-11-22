<?php

namespace App\Service\ExaminationProcess\Layer\Persistence;

use App\Entity\Course;
use App\Entity\CourseAnswer;
use App\Entity\CourseElement;
use App\Entity\CourseSheet;
use App\Entity\CourseSheetStatusNotFound;
use App\Entity\User;
use App\Repository\CourseAnswerRepository;
use App\Repository\CourseSheetRepository;
use DateTimeInterface;

class ProcessSaver
{
    public function __construct(
        private readonly CourseSheetRepository $sheetRepository,
        private readonly CourseAnswerRepository $answerRepository,
    ) {
    }

    public function addNewAnswer(
        CourseSheet $sheet,
        CourseElement $element,
        ?string $textAnswer,
        DateTimeInterface $now
    ): CourseAnswer {

        $answer = new CourseAnswer();
        $answer->setCourceSheet($sheet);
        $answer->setQuestion($element);
        $answer->setAnswer($textAnswer ?? '');
        $answer->setCreatedAt($now);
        $answer->setUpdatedAt($now);

        $this->answerRepository->add($answer);

        $sheet->setUpdatedAt($now);
        $this->sheetRepository->add($sheet);

        return $answer;
    }

    /**
     * @throws CourseSheetStatusNotFound
     */
    public function saveSheet(
        User $user,
        Course $course,
        ?CourseElement $actualElement,
        DateTimeInterface $now,
        CourseSheet $sheet = null
    ): CourseSheet {

        if (null === $sheet) {
            $sheet = $this->getSheet($user, $course);
        }

        if (null === $sheet) {
            $sheet = new CourseSheet();
            $sheet->setStudent($user);
            $sheet->setCourse($course);
            $sheet->setCreatedAt($now);
            $sheet->setStatus(CourseSheet::STATUS_STARTED);
        }

        $sheet->setActualElement($actualElement);
        $sheet->setUpdatedAt($now);

        $this->sheetRepository->add($sheet);
        return $sheet;
    }

    public function getSheet(User $user, Course $course): ?CourseSheet
    {
        return $this->sheetRepository->findOneBy([
            'course' => $course,
            'student' => $user,
        ]);
    }

    public function getAnswer(CourseSheet $sheet, CourseElement $currentElement): ?CourseAnswer
    {
        return $this->answerRepository->findOneBy(
            [
                'courceSheet' => $sheet,
                'question' => $currentElement,
            ],
            ['id' => 'DESC']
        );
    }
}