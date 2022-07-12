<?php

namespace App\Connectors\Student;

use App\Connectors\ExamConvertor;
use App\Repository\ExamRepository;
use RusakovNikita\MysqlExam\Exam\Student;

class ExaminationRepository implements \RusakovNikita\MysqlExam\Student\ExaminationRepository
{
    public function __construct(private ExamRepository $repository, private ExamConvertor $convertor)
    {
    }

    public function getExaminationForStudent(Student $student): array
    {
        $result = [];
        foreach ($this->repository->findAll() as $exam) {
            $result[] = $this->convertor->toBusinessModel($exam);
        }
        return $result;
    }
}