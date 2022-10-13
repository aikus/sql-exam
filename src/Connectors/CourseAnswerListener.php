<?php

namespace App\Connectors;

use App\Entity\CourseAnswer;
use Doctrine\ORM\Event\LifecycleEventArgs;

class CourseAnswerListener
{
    public function prePersist(CourseAnswer $answer, LifecycleEventArgs $event)
    {

    }
}