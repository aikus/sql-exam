<?php

namespace App\Connectors;

use RusakovNikita\MysqlExam\EditExam\ExamIdGenerator;
use Symfony\Component\Uid\Uuid;

class IdGenerator implements ExamIdGenerator
{
    public function __construct(private string $url)
    {
    }

    private function generate(): string
    {
        return Uuid::v3(Uuid::fromString(Uuid::NAMESPACE_URL), $this->url)->toRfc4122();
    }

    public function generateExamId(): string
    {
        return $this->generate();
    }
}