<?php

namespace RusakovNikita\MysqlExam\EditExam;

use RusakovNikita\MysqlExam\Exam\Exam;
use RusakovNikita\MysqlExam\Exam\Question;
use RusakovNikita\MysqlExam\Exam\Teacher;

class ExamAdmin
{
    public function __construct(private ExamIdGenerator $generator, private ExamRepository $repository)
    {
    }

    public function createExam(Teacher $teacher)
    {
        return new Exam($this->generator->generateExamId(), $teacher);
    }

    public function getExam(string $id): Exam
    {
        return $this->repository->getExam($id);
    }

    public function setDescription(Exam $exam, string $description): void
    {
        $exam->setDescription($description);
        $this->repository->saveExam($exam);
    }

    public function addQuestion(Exam $exam, Question $question): void
    {
        $exam->addQuestion($question);
        $this->repository->saveExam($exam);
    }

    public function removeQuestion(Exam $exam, Question $question): void
    {
        $exam->removeQuestion($question);
        $this->repository->saveExam($exam);
    }

    public function deleteExam(Exam $exam): void
    {
        $this->repository->deleteExam($exam);
    }
}