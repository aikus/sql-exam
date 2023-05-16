<?php

namespace App\Connectors\AnswerHandler;

use App\Connectors\PdoConnectorFactory;
use App\Controller\Api\SqlMetadataController;
use App\Entity\CourseAnswer;
use App\Entity\CourseElement;
use App\Service\CheckRight\Domain\CheckRight;
use App\Service\DBConfigure;

class Factory
{
    public function __construct(private string $mysqlDSN, private string $mysqlLogin, private string $mysqlPassword,
                                private string $pgDSN, private string $pgLogin, private string $pgPassword,
                                private PdoConnectorFactory $connectorFactory, private CheckRight $checkRight)
    {}
    public function getHandler(CourseAnswer $answer): Handler
    {
        $question = $answer->getQuestion();
        if(CourseElement::TYPE_MYSQL == $question->getType()) {
            return new Sql(
                $this->connectorFactory->createConnect($this->mysqlDSN, $this->mysqlLogin, $this->mysqlPassword),
                $this->checkRight
            );
        }
        if(CourseElement::TYPE_POSTGRES == $question->getType()) {
            return new Sql(
                $this->connectorFactory->createConnect($this->pgDSN, $this->pgLogin, $this->pgPassword),
                $this->checkRight
            );
        }
        if(CourseElement::TYPE_SQL == $question->getType()) {
            return (new DBConfigure())->getHandler($question->getMetaType(), $this->checkRight);
        }
        return new Noop();
    }
}