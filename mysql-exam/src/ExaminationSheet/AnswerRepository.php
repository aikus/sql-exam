<?php

namespace RusakovNikita\MysqlExam\ExaminationSheet;

use RusakovNikita\MysqlExam\Exam\Answer;

interface AnswerRepository
{
    public function get(string $id): Answer;
    public function save(Answer $answer): void;
}