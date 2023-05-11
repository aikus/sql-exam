<?php

namespace App\Connectors;

use App\Entity\CourseElement;
use App\Entity\CourseSheet;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Exception;

class CourseSheetListener
{
    /**  @throws Exception */
    public function prePersist(CourseSheet $sheet, LifecycleEventArgs $event): void
    {
        $course = $sheet->getCourse();
        $sheet->setActualElement($this->actualElement($course->getType()));
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