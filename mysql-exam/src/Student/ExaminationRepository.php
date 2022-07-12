<?php

namespace RusakovNikita\MysqlExam\Student;

use RusakovNikita\MysqlExam\Exam\Exam;
use RusakovNikita\MysqlExam\Exam\Student;

interface ExaminationRepository
{
    /**
     * @param Student $student
     * @return array<Exam>
     */
    public function getExaminationForStudent(Student $student): array;
}