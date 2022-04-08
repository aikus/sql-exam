<?php

namespace RusakovNikita\MysqlExam\EditExam;

use RusakovNikita\MysqlExam\Exam\Question;

interface QuestionRepository
{
    public function saveQuestion(Question $question): void;
}