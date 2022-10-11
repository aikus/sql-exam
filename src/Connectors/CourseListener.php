<?php

namespace App\Connectors;

use App\Entity\Course;
use Doctrine\Persistence\Event\LifecycleEventArgs;
use Symfony\Component\Security\Core\Security;

class CourseListener
{
    public function __construct(private Security $security)
    {
    }

    public function prePersist(Course $course, LifecycleEventArgs $event)
    {
        if(!$course->getCreator()){
            $course->setCreator($this->security->getUser());
        }

    }
}