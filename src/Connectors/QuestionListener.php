<?php

namespace App\Connectors;

use App\Entity\Question;
use Doctrine\Persistence\Event\LifecycleEventArgs;

class QuestionListener
{
    public function __construct(private IdGenerator $generator)
    {
    }

    public function prePersist(Question $question, LifecycleEventArgs $event)
    {
        if(!$question->getId()) {
            $question->setId($this->generator->generateQuestionId());
        }
    }
}