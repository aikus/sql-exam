<?php

namespace App\Connectors\CourseElementHandler;

use App\Connectors\PdoConnection;
use App\Entity\CourseElement;
use Exception;

class Sql implements Handler
{
    public function __construct(
        private readonly PdoConnection $connection
    ) {
    }

    public function handle(CourseElement $element)
    {
        try {
            $result = $this->connection->fetchAll($element->getAnswer());
            $element->setAnswerExecutionResult([
                'error' => '',
                'result' => $result,
                'header' => $this->connection->getColumnMeta(),
            ]);
        } catch (Exception $exception) {
            $element->setAnswerExecutionResult([
                'error' => $exception->getMessage(),
                'result' => [],
                'header' => [],
                'trace' => $exception->getTrace()
            ]);
        }
    }
}