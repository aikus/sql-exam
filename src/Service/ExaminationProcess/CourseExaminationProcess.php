<?php

namespace App\Service\ExaminationProcess;

use App\Entity\Course;
use App\Entity\CourseElement;
use App\Entity\User;
use DateTimeInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Exception;

class CourseExaminationProcess implements ExaminationProcess
{
    public const ERROR_MESSAGE_EMPTY_SHEET = 'Не найден список с ответами для данного ученика';

    public const ERROR_MESSAGE_EMPTY_ELEMENT = 'Курс уже пройден';

    public function __construct(
        private readonly EntityCreator $creator,
    ) {
    }

    /**
     * @throws ExaminationProcessException
     * @throws Exception
     */
    public function start(User $user, Course $course, DateTimeInterface $now): Response
    {
        $typeCollection = $course->getType();

        if ($typeCollection->count() <= 0) {
            throw new ExaminationProcessException('Не найдено ни одного шага курса');
        }

        $iterator = $typeCollection->getIterator();
        $iterator->uasort(function (CourseElement $a, CourseElement $b) {
            return $a->getOrd() <=> $b->getOrd();
        });

        $actualElement = (new ArrayCollection(iterator_to_array($iterator)))->first();

        $sheet = $this->creator->findSheet([
            'student' => $user,
            'course' => $course,
        ]);

        if (null === $sheet) {
            $sheet = $this->creator->createSheet($course, $user, $actualElement, $now);
        }
        else {
            $sheet->setActualElement($actualElement);
            $sheet = $this->creator->updateSheet($sheet);
        }

        return new Response($sheet, $sheet->getActualElement(), $this->getNext($course, $actualElement));
    }

    /**
     * @throws ExaminationProcessException
     */
    public function answer(
        User $user,
        Course $course,
        ?string $sqlText,
        DateTimeInterface $now
    ): Response {

        $sheet = $this->creator->findSheet([
            'student' => $user,
            'course' => $course,
        ]);

        if (null === $sheet) {
            throw new ExaminationProcessException(self::ERROR_MESSAGE_EMPTY_SHEET);
        }

        $currentElement = $sheet->getActualElement();

        if (null === $currentElement) {
            throw new ExaminationProcessException(self::ERROR_MESSAGE_EMPTY_ELEMENT);
        }

        $this->creator->addNewAnswer($sheet, $currentElement, $sqlText);

        $nextElement = $course->getType()->filter(function (CourseElement $element) use ($currentElement) {
            return (int) ($currentElement->getOrd() + 1) === (int) $element->getOrd();
        })->first();

        $sheet->setActualElement($nextElement ?: null);
        $this->creator->updateSheet($sheet);

        return new Response($sheet, $sheet->getActualElement(), $this->getNext($course, $nextElement));
    }

    /**
     * @throws ExaminationProcessException
     */
    public function execution(
        User $user,
        Course $course,
        ?string $sqlText,
        DateTimeInterface $now
    ): Response {

        $sheet = $this->creator->findSheet([
            'student' => $user,
            'course' => $course,
        ]);

        if (null === $sheet) {
            throw new ExaminationProcessException(self::ERROR_MESSAGE_EMPTY_SHEET);
        }

        $currentElement = $sheet->getActualElement();

        $this->creator->addNewAnswer($sheet, $currentElement, $sqlText);

        return new Response($sheet, $sheet->getActualElement(), $this->getNext($course, $currentElement));
    }

    private function getNext(Course $course, CourseElement $currentElement): CourseElement
    {
        return $course->getType()->filter(function (CourseElement $element) use ($currentElement) {
            return (int) ($currentElement->getOrd() + 1) === (int) $element->getOrd();
        })->first();
    }
}