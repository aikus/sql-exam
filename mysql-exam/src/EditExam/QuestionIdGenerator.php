<?php

namespace RusakovNikita\MysqlExam\EditExam;

interface QuestionIdGenerator
{
    public function generateQuestionId(): string;
}