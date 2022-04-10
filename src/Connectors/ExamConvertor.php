<?php

namespace App\Connectors;

use RusakovNikita\MysqlExam\Exam\Exam;
use \App\Entity\Exam as OrmExam;

class ExamConvertor
{
    public function __construct(private TeacherFinder $finder)
    {
    }

    public function toOrmModel(Exam $exam): OrmExam
    {
        $result = new OrmExam();
        $result->setId($exam->getId());
        $result->setDescription($exam->getDescription());
        $result->setCreator($this->finder->getUserByTeacher($exam->getTeacher()));

        return $result;
    }

    public function toBusinessModel(OrmExam $exam): Exam
    {
        return new Exam($exam->getId(), $exam->getCreator(), $exam->getDescription());
    }
}