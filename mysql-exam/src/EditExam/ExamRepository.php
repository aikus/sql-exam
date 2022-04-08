<?php

namespace RusakovNikita\MysqlExam\EditExam;

use RusakovNikita\MysqlExam\Exam\Exam;

interface ExamRepository
{
    public function saveExam(Exam $exam): void;
    public function getExam(string $id): Exam;
    public function deleteExam(Exam $exam): void;
}