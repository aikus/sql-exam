<?php

namespace RusakovNikita\MysqlExam\Student;

use RusakovNikita\MysqlExam\Exam\Exam;
use RusakovNikita\MysqlExam\Exam\ExaminationSheet;
use RusakovNikita\MysqlExam\Exam\Student;

interface ExaminationSheetRepository
{
    public function createExaminationSheet(Exam $exam, Student $student): ExaminationSheet;
    public function getExaminationSheetById(string $sheetId): ?ExaminationSheet;
    public function getExaminationByQuestionId(string $questionId, Student $student): ?ExaminationSheet;
}