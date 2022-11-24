<?php

namespace App\Service\ExaminationProcess\Layer\Domain;

use App\Entity\Course;
use App\Entity\CourseElement;
use App\Entity\CourseSheet;
use App\Entity\CourseSheetStatusNotFound;
use App\Entity\User;
use App\Service\ExaminationProcess\Layer\Persistence\ProcessSaver;
use App\Service\ExaminationProcess\Layer\Responder\ProcessState;
use DateTimeImmutable;
use DateTimeInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Exception;

class Process
{
    public const ERROR_MESSAGE_EMPTY_SHEET = 'Не найден список с ответами для данного ученика';
    public const ERROR_MESSAGE_EMPTY_ELEMENT = 'Курс уже пройден';
    public const ERROR_MESSAGE_COURSE_NOT_ASSIGNED = 'Вам ещё не назначен этот курс';

    public function __construct(
        private readonly ProcessSaver $saver,
    ) {
    }

    /**
     * @param User $user
     * @param Course $course
     * @param DateTimeInterface $now
     * @return ProcessState
     * @throws Exception
     * @throws ExaminationProcessException|CourseSheetStatusNotFound
     */
    public function start(User $user, Course $course, DateTimeInterface $now): ProcessState
    {
        $typeCollection = $course->getType();

        if ($typeCollection->count() <= 0) {
            return new ProcessState(ProcessState::STATE_NOT_READY, 0, [], null);
        }

        $actualElement = $this->actualElement($typeCollection);

        $sheet = $this->saver->findAndStart($user, $course, $actualElement, $now);

        if (null === $sheet) {
            throw new ExaminationProcessException(self::ERROR_MESSAGE_COURSE_NOT_ASSIGNED);
        }

        $answer = $this->saver->getAnswer($sheet, $actualElement);

        return new ProcessState(
            ProcessState::STATE_IN_PROGRESS,
            $course->getType()->count(),
            $course->getType()->toArray(),
            $sheet->getActualElement(),
            ($answer ?? null)?->getAnswer(),
            ($answer ?? null)?->getResult(),
            $sheet->getStartedAt()
        );
    }

    /**
     * @param User $user
     * @param Course $course
     * @param string|null $sqlText
     * @param DateTimeInterface $now
     * @return ProcessState
     * @throws ExaminationProcessException
     */
    public function execution(User $user, Course $course, ?string $sqlText, DateTimeInterface $now): ProcessState {

        $sheet = $this->saver->getSheet($user, $course, [CourseSheet::STATUS_STARTED]);

        if (null === $sheet) {
            throw new ExaminationProcessException(self::ERROR_MESSAGE_EMPTY_SHEET);
        }

        $currentElement = $sheet->getActualElement();

        if (null === $currentElement) {
            throw new ExaminationProcessException(self::ERROR_MESSAGE_EMPTY_ELEMENT);
        }

        if (!empty($sqlText)) {
            $answer = $this->saver->addNewAnswer($sheet, $currentElement, $sqlText, $now);
        }

        return new ProcessState(
            ProcessState::STATE_IN_PROGRESS,
            $course->getType()->count(),
            $course->getType()->toArray(),
            $sheet->getActualElement(),
            ($answer ?? null)?->getAnswer(),
            ($answer ?? null)?->getResult(),
            $sheet->getStartedAt()
        );
    }

    /**
     * @param User $user
     * @param Course $course
     * @param string|null $sqlText
     * @param DateTimeInterface $now
     * @return ProcessState
     * @throws ExaminationProcessException|CourseSheetStatusNotFound
     */
    public function finish(User $user, Course $course, ?string $sqlText, DateTimeInterface $now): ProcessState {

        $sheet = $this->saver->getSheet($user, $course, [CourseSheet::STATUS_STARTED]);

        if (null === $sheet) {
            throw new ExaminationProcessException(self::ERROR_MESSAGE_EMPTY_SHEET);
        }

        $currentElement = $sheet->getActualElement();

        if (null === $currentElement) {
            throw new ExaminationProcessException(self::ERROR_MESSAGE_EMPTY_ELEMENT);
        }

        if (!empty($sqlText)) {
            $answer = $this->saver->addNewAnswer($sheet, $currentElement, $sqlText, $now);
        }
        $sheet->setStatus(CourseSheet::STATUS_COMPLETED);
        $sheet->setFinishedAt(new DateTimeImmutable($now->format('Y-m-d H:i:s')));
        $this->saver->updateSheet($sheet, $currentElement, $now);

        return new ProcessState(
            ProcessState::STATE_IN_PROGRESS,
            $course->getType()->count(),
            $course->getType()->toArray(),
            $sheet->getActualElement(),
            ($answer ?? null)?->getAnswer(),
            ($answer ?? null)?->getResult(),
            $sheet->getStartedAt()
        );
    }

    /**
     * @param User $user
     * @param Course $course
     * @param string|null $sqlText
     * @param DateTimeInterface $now
     * @return ProcessState
     * @throws ExaminationProcessException
     */
    public function answer(User $user, Course $course, ?string $sqlText, DateTimeInterface $now): ProcessState {

        $sheet = $this->saver->getSheet($user, $course, [CourseSheet::STATUS_STARTED]);

        if (null === $sheet) {
            throw new ExaminationProcessException(self::ERROR_MESSAGE_EMPTY_SHEET);
        }

        $currentElement = $sheet->getActualElement();

        if (null === $currentElement) {
            throw new ExaminationProcessException(self::ERROR_MESSAGE_EMPTY_ELEMENT);
        }

        if (!empty($sqlText)) {
            $answer = $this->saver->addNewAnswer($sheet, $currentElement, $sqlText, $now);
        }

        $nextElement = $course->getType()->filter(function (CourseElement $element) use ($currentElement) {
            return (int) ($currentElement->getOrd() + 1) === (int) $element->getOrd();
        })->first();

        $this->saver->updateSheet($sheet, $nextElement ?: null, $now);

        return new ProcessState(
            ProcessState::STATE_IN_PROGRESS,
            $course->getType()->count(),
            $course->getType()->toArray(),
            $sheet->getActualElement(),
            ($answer ?? null)?->getAnswer(),
            ($answer ?? null)?->getResult(),
            $sheet->getStartedAt()
        );
    }

    /**
     * @param User $user
     * @param Course $course
     * @param DateTimeInterface $now
     * @return ProcessState
     * @throws ExaminationProcessException
     */
    public function previousStep(User $user, Course $course, DateTimeInterface $now): ProcessState {

        $sheet = $this->saver->getSheet($user, $course, [CourseSheet::STATUS_STARTED]);

        if (null === $sheet) {
            throw new ExaminationProcessException(self::ERROR_MESSAGE_EMPTY_SHEET);
        }

        $currentElement = $sheet->getActualElement();

        if (null === $currentElement) {
            throw new ExaminationProcessException(self::ERROR_MESSAGE_EMPTY_ELEMENT);
        }

        $prevElement = $course->getType()->filter(function (CourseElement $element) use ($currentElement) {
            return (int) ($currentElement->getOrd() - 1) === (int) $element->getOrd();
        })->first();

        $answer = $this->saver->getAnswer($sheet, $prevElement);

        $this->saver->updateSheet($sheet, $prevElement ?: null, $now);

        return new ProcessState(
            ProcessState::STATE_IN_PROGRESS,
            $course->getType()->count(),
            $course->getType()->toArray(),
            $sheet->getActualElement(),
            ($answer ?? null)?->getAnswer(),
            ($answer ?? null)?->getResult(),
            $sheet->getStartedAt()
        );
    }

    /**
     * @param Collection<int, CourseElement> $elementCollection
     * @return CourseElement
     * @throws Exception
     */
    private function actualElement(Collection $elementCollection): CourseElement
    {
        $iterator = $elementCollection->getIterator();
        $iterator->uasort(function (CourseElement $a, CourseElement $b) {
            return $a->getOrd() <=> $b->getOrd();
        });

        return (new ArrayCollection(iterator_to_array($iterator)))->first();
    }
}