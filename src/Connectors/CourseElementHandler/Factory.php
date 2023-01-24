<?php

namespace App\Connectors\CourseElementHandler;

use App\Connectors\PdoConnectorFactory;
use App\Entity\CourseElement;

class Factory
{
    public function __construct(private string $mysqlDSN, private string $mysqlLogin, private string $mysqlPassword,
                                private string $pgDSN, private string $pgLogin, private string $pgPassword,
                                private PdoConnectorFactory $connectorFactory)
    {}
    public function getHandler(CourseElement $element): Handler
    {
        if(CourseElement::TYPE_MYSQL == $element->getType()) {
            return new Sql(
                $this->connectorFactory->createConnect($this->mysqlDSN, $this->mysqlLogin, $this->mysqlPassword)
            );
        }
        if(CourseElement::TYPE_POSTGRES == $element->getType()) {
            return new Sql(
                $this->connectorFactory->createConnect($this->pgDSN, $this->pgLogin, $this->pgPassword)
            );
        }
        return new Noop();
    }
}