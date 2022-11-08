<?php

namespace App\Connectors\AnswerHandler;

use App\Connectors\PdoConnectorFactory;
use App\Entity\CourseAnswer;
use App\Entity\CourseElement;

class Factory
{
    public function __construct(private string $mysqlDSN, private string $mysqlLogin, private string $mysqlPassword,
                                private string $pgDSN, private string $pgLogin, private string $pgPassword,
                                private PdoConnectorFactory $connectorFactory)
    {}
    public function getHandler(CourseAnswer $answer): Handler
    {
        $question = $answer->getQuestion();
        if(CourseElement::TYPE_MYSQL == $question->getType()) {
            return new Sql($this->connectorFactory->createConnect($this->mysqlDSN, $this->mysqlLogin, $this->mysqlPassword));
        }
        if(CourseElement::TYPE_POSTGRES == $question->getType()) {
            return new Sql($this->connectorFactory->createConnect($this->pgDSN, $this->pgLogin, $this->pgPassword));
        }
        return new Noop();
    }
}