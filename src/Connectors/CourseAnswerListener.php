<?php

namespace App\Connectors;

use App\Connectors\AnswerHandler\Factory;
use App\Entity\CourseAnswer;
use Doctrine\ORM\Event\LifecycleEventArgs;

class CourseAnswerListener
{
    public function __construct(private Factory $handlerFactory)
    {
    }

    public function prePersist(CourseAnswer $answer, LifecycleEventArgs $event): void
    {
        $this->handlerFactory->getHandler($answer)->handle($answer);
    }
}