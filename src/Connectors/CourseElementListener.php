<?php

namespace App\Connectors;

use App\Connectors\CourseElementHandler\Factory;
use App\Entity\CourseElement;
use Doctrine\ORM\Event\LifecycleEventArgs;

class CourseElementListener
{
    public function __construct(private Factory $handlerFactory)
    {
    }

    public function prePersist(CourseElement $element, LifecycleEventArgs $event): void
    {
        $this->handlerFactory->getHandler($element)->handle($element);
    }
}