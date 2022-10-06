<?php

namespace App\Connectors;

use RusakovNikita\MysqlExam\EditExam\ExamIdGenerator;
use RusakovNikita\MysqlExam\EditExam\QuestionIdGenerator;
use Symfony\Component\Uid\Uuid;

class IdGenerator implements ExamIdGenerator, QuestionIdGenerator
{
    private function generate(): string
    {
        return Uuid::v4()->toRfc4122();
    }

    public function generateExamId(): string
    {
        return $this->generate();
    }

    public function generateQuestionId(): string
    {
        return $this->generate();
    }

    public function generateAnswerId(): string
    {
        return $this->generate();
    }

    public function generateExaminationSheetId(): string
    {
        return $this->generate();
    }
}