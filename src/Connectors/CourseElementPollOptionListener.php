<?php

namespace App\Connectors;

use App\Entity\CourseElementPollOption;
use Doctrine\ORM\Event\LifecycleEventArgs;

class CourseElementPollOptionListener
{
    public function prePersist(CourseElementPollOption $pollOption, LifecycleEventArgs $event): void
    {
        $pollOption->setCreateTime(new \DateTime());
        $pollOption->setCreateTime(new \DateTime());
    }
}