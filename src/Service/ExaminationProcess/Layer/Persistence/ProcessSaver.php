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
use DateTime;
use DateTimeImmutable;
use DateTimeInterface;
use Doctrine\Common\Collections\Criteria;
use Exception;

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
        $answer->setCreatedAt(new DateTimeImmutable($now->format('Y-m-d H:i:s')));
        $answer->setUpdatedAt(new DateTimeImmutable($now->format('Y-m-d H:i:s')));

        $this->answerRepository->add($answer);

        $sheet->setUpdatedAt($now);
        $this->sheetRepository->add($sheet);

        return $answer;
    }

    public function updateSheet(
        CourseSheet $sheet,
        ?CourseElement $actualElement,
        DateTimeInterface $now
    ): CourseSheet {

        $sheet->setActualElement($actualElement);
        $sheet->setUpdatedAt($now);

        $this->sheetRepository->add($sheet);
        return $sheet;
    }

    /**
     * @throws CourseSheetStatusNotFound
     */
    public function newSheet(
        User $user,
        Course $course,
        ?CourseElement $actualElement
    ): void {

        $sheet = new CourseSheet();
        $sheet->setCourse($course);
        $sheet->setActualElement($actualElement);
        $sheet->setStudent($user);
        $sheet->setCreatedAt(new DateTime());
        $sheet->setStatus(CourseSheet::STATUS_RESTARTABLE);

        $this->sheetRepository->add($sheet);
    }

    /**
     * @throws CourseSheetStatusNotFound
     * @throws Exception
     */
    public function findAndStart(
        User $user,
        Course $course,
        ?CourseElement $actualElement,
        DateTimeInterface $now
    ): ?CourseSheet {

        $sheet = $this->getSheet($user, $course, [
            CourseSheet::STATUS_NEW,
            CourseSheet::STATUS_STARTED,
            CourseSheet::STATUS_RESTARTABLE,
        ]);

        if (null === $sheet) {
            return null;
        }

        if(!$sheet->getStartedAt()) {
            $sheet->setStartedAt(new DateTimeImmutable($now->format('Y-m-d H:i:s')));
        }

        $sheet->setStatus(CourseSheet::STATUS_STARTED);

        $sheet->setActualElement($actualElement);
        $sheet->setUpdatedAt(new DateTimeImmutable($now->format('Y-m-d H:i:s')));

        $this->sheetRepository->add($sheet);
        return $sheet;
    }

    public function getSheet(User $user, Course $course, array $statuses = []): ?CourseSheet
    {
        return $this->sheetRepository->matching(
            Criteria::create()
                ->where(Criteria::expr()->eq('course', $course))
                ->andWhere(Criteria::expr()->eq('student', $user))
                ->andWhere(Criteria::expr()->in('status', $statuses))
                ->setMaxResults(1)
        )->last() ?: null;
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