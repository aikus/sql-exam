<?php

namespace RusakovNikita\MysqlExam\ExaminationSheet;

use RusakovNikita\MysqlExam\Exam\ExaminationSheet;

interface ExaminationSheetRepository
{
    public function saveExaminationSheet(ExaminationSheet $sheet): void;
}