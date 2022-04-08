<?php

namespace RusakovNikita\MysqlExam\ExaminationSheet;

interface AnswerIdGenerator
{
    public function generateAnswerId(): string;
}