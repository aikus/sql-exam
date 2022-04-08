<?php

namespace RusakovNikita\MysqlExam\ExaminationSheet;

interface ExaminationSheetIdGenerator
{
    public function generateExaminationSheetId(): string;
}