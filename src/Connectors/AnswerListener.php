<?php

namespace App\Connectors;

use App\Entity\Answer;
use DateTime;
use Doctrine\Persistence\Event\LifecycleEventArgs;

class AnswerListener
{
    public function __construct(private IdGenerator $generator, private PdoConnection $connector)
    {
    }

    public function prePersist(Answer $answer, LifecycleEventArgs $event)
    {
        $now = new DateTime();
        if(!$answer->getId()) {
            $answer->setId($this->generator->generateAnswerId());
        }
        if(!$answer->getStart()) {
            $answer->setStart($now);
        }
        $answer->setEnd($now);
    }
}