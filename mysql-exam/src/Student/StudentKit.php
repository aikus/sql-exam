<?php

namespace RusakovNikita\MysqlExam\Student;

use RusakovNikita\MysqlExam\Exam\Student;

class StudentKit
{
    public function __construct(private ExaminationRepository $examinationRepository,
        private ExaminationSheetRepository $examinationSheetRepository)
    {
    }

    public function getExaminationSheet(Student $student): array
    {
        return $this->examinationRepository->getExaminationForStudent($student);
    }
}