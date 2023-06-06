<?php

namespace App\Connectors;

use App\Entity\Course;
use App\Entity\User;
use Doctrine\Persistence\Event\LifecycleEventArgs;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\Security\Core\Security;

class CourseListener
{
    public function __construct(private Security $security)
    {
    }

    public function prePersist(Course $course, LifecycleEventArgs $event): void
    {
        if(!$course->getCreator()){
            $course->setCreator($this->security->getUser());
        }
    }

    public function preRemove(Course $course, LifecycleEventArgs $event): void
    {
        $actor = $this->security->getUser();
        if(
            !in_array(User::ROLE_ADMIN, $actor->getRoles())
            && $course->getCreator()->getUserIdentifier() !== $actor->getUserIdentifier()
        ) {
            throw new AccessDeniedHttpException('Вы не являетесь создателем курса или администратором');
        }
    }
}