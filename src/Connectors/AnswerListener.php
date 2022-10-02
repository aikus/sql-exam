<?php

namespace App\Connectors;

use App\Entity\Answer;
use Doctrine\Persistence\Event\LifecycleEventArgs;

class AnswerListener
{
    public function __construct(private IdGenerator $generator)
    {
    }

    public function prePersist(Answer $answer, LifecycleEventArgs $event)
    {
        if(!$answer->getId()) {
            $answer->setId($this->generator->generateAnswerId());
        }
    }
}