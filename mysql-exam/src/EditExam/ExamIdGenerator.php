<?php

namespace RusakovNikita\MysqlExam\EditExam;

interface ExamIdGenerator
{
    public function generateExamId(): string;
}