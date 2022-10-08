<?php

namespace App\Connectors;

use App\Entity\Exam;
use Doctrine\Persistence\Event\LifecycleEventArgs;
use Symfony\Component\Security\Core\Security;

class ExamListener
{
    public function __construct(private Security $security, private IdGenerator $generator)
    {
    }

    public function prePersist(Exam $exam, LifecycleEventArgs $event)
    {
        if(!$exam->getCreator()) {
            $exam->setCreator($this->security->getUser());
        }
        if(!$exam->getId()) {
            $exam->setId($this->generator->generateExamId());
        }
    }
}