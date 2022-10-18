<?php

namespace App\Connectors;

use App\Entity\CourseAnswer;
use App\Entity\CourseElement;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Exception;

class CourseAnswerListener
{
    public function __construct(private PdoConnection $studentConnection)
    {
    }

    public function prePersist(CourseAnswer $answer, LifecycleEventArgs $event)
    {
        if($answer->getQuestion()->getType() === CourseElement::TYPE_MYSQL && (bool) $answer->getAnswer()) {
            $this->studentConnection->fetchAll($answer->getAnswer());
        }
    }

    private function addSqlResult(CourseAnswer $answer): void
    {
        try {
            $result = $this->studentConnection->fetchAll($answer->getAnswer());
            $answer->setResult([
                'error' => '',
                'result' => $result
            ]);
        } catch (Exception $exception) {
            $answer->setResult([
                'error' => $exception->getMessage(),
                'result' => []
            ]);
        }
    }
}