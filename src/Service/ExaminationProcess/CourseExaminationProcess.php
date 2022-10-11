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
    public function __construct(
        private readonly EntityCreator $creator,
    ) {
    }

    /**
     * @throws Exception
     */
    public function start(User $user, Course $course, DateTimeInterface $now): array
    {
        $iterator = $course->getType()->getIterator();
        $iterator->uasort(function (CourseElement $a, CourseElement $b) {
            return $a->getOrd() <=> $b->getOrd();
        });

        $actualElement = (new ArrayCollection(iterator_to_array($iterator)))->first();

        $examSheet = $this->creator->createSheet($course, $user, $actualElement, $now);

        return [
            'examinationSheet' => $examSheet->getId(),
            'element' => $actualElement->getId(),
        ];

    }

    public function next(User $user, Course $course, DateTimeInterface $now): array
    {
        $sheet = $this->creator->findSheet([
            'student' => $user,
            'course' => $course,
        ]);

        $currentElement = $sheet->getActualElement();

        $nextElement = $course->getType()->filter(function (CourseElement $element) use ($currentElement) {
            return (int) ($currentElement->getOrd() + 1) === (int) $element->getOrd();
        })->first();

        if (!$nextElement) {
            return [
                'sheet' => $sheet->getId(),
                'element' => null,
            ];
        }

        $sheet = $this->creator->updateSheet($sheet, $nextElement);

        return [
            'sheet' => $sheet->getId(),
            'element' => $nextElement->getId(),
        ];
    }
}