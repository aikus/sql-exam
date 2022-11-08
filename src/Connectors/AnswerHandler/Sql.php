<?php

namespace App\Connectors\AnswerHandler;

use App\Connectors\PdoConnection;
use App\Entity\CourseAnswer;
use Exception;

class Sql implements Handler
{
    public function __construct(private PdoConnection $connection)
    {
    }

    public function handle(CourseAnswer $answer)
    {
        try {
            $result = $this->connection->fetchAll($answer->getAnswer());
            $answer->setResult([
                'error' => '',
                'result' => $result,
                'header' => $this->connection->getColumnMeta(),
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