<?php

namespace App\Connectors;

use App\Connectors\CourseElementHandler\Factory;
use App\Entity\CourseAnswer;
use Doctrine\ORM\Event\LifecycleEventArgs;

class CourseAnswerListener
{
    public function __construct(private Factory $handlerFactory)
    {
    }

    public function prePersist(CourseAnswer $answer, LifecycleEventArgs $event): void
    {
//        echo $answer->getQuestion()->getType();die;
        $this->handlerFactory->getHandler($answer)->handle($answer);
    }
}