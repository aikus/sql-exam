<?php

namespace App\Connectors;

use App\Entity\CourseAnswer;
use App\Entity\CourseElement;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Exception;

class CourseAnswerListener
{
    public function __construct(private readonly PdoConnection $studentConnection)
    {
    }

    public function prePersist(CourseAnswer $answer, LifecycleEventArgs $event): void
    {
        if($answer->getQuestion()->getType() === CourseElement::TYPE_MYSQL && (bool) $answer->getAnswer()) {
            $this->addSqlResult($answer);
        }
    }

    private function addSqlResult(CourseAnswer $answer): void
    {
        try {
            $result = $this->studentConnection->fetchAll($answer->getAnswer());
            $answer->setResult([
                'error' => '',
                'result' => $result,
                'header' => $this->studentConnection->getColumnMeta(),
            ]);
        } catch (Exception $exception) {
            $answer->setResult([
                'error' => $exception->getMessage(),
                'result' => [],
                'header' => [],
            ]);
        }
    }
}