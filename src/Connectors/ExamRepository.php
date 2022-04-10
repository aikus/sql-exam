<?php

namespace App\Connectors;

use RusakovNikita\MysqlExam\Exam\Exam;

class ExamRepository implements \RusakovNikita\MysqlExam\EditExam\ExamRepository
{
    public function __construct(private \App\Repository\ExamRepository $repository, private ExamConvertor $convertor)
    {
    }

    public function saveExam(Exam $exam): void
    {
        $this->repository->add($this->convertor->toOrmModel($exam));
    }

    public function getExam(string $id): Exam
    {
        $exam = $this->repository->find($id);
        if(!$exam) {
            throw new ExamNotFound();
        }
        return $this->convertor->toBusinessModel($exam);
    }

    public function deleteExam(Exam $exam): void
    {
        // TODO: Implement deleteExam() method.
    }
}