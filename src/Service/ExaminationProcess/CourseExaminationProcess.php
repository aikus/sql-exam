<?php

namespace App\Service\ExaminationProcess;

use App\Entity\Course;
use App\Entity\CourseAnswer;
use App\Entity\CourseElement;
use App\Entity\User;
use DateTimeInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Exception;

class CourseExaminationProcess implements ExaminationProcess
{
    public const ERROR_MESSAGE_EMPTY_ANSWER = 'Ответ на вопрос не может быть пустым';

    public function __construct(
        private readonly EntityCreator $creator,
    ) {
    }

    /**
     * @throws Exception
     */
    public function start(User $user, Course $course, DateTimeInterface $now): CourseElement
    {
        $iterator = $course->getType()->getIterator();
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

        return $sheet->getActualElement();

    }

    /**
     * @throws Exception
     */
    public function answer(
        User $user,
        Course $course,
        ?string $sqlText,
        DateTimeInterface $now
    ): ?CourseElement {

        $sheet = $this->creator->findSheet([
            'student' => $user,
            'course' => $course,
        ]);

        if (null === $sheet) return null;

        if (null === $sqlText) {
            throw new Exception(self::ERROR_MESSAGE_EMPTY_ANSWER);
        }

        $currentElement = $sheet->getActualElement();

        $answer = new CourseAnswer();
        $answer->setQuestion($currentElement);
        $answer->setAnswer($sqlText);

        $sheet->addCourseAnswer($answer);
        $sheet = $this->creator->updateSheet($sheet);

        $nextElement = $course->getType()->filter(function (CourseElement $element) use ($currentElement) {
            return (int) ($currentElement->getOrd() + 1) === (int) $element->getOrd();
        })->first();

        if (!$nextElement) return null;

        $sheet->setActualElement($nextElement);
        $sheet = $this->creator->updateSheet($sheet);

        return $nextElement;
    }
}