<?php

namespace RusakovNikita\MysqlExam\ExaminationSheet;

use RusakovNikita\MysqlExam\Exam\Answer;
use RusakovNikita\MysqlExam\Exam\Exam;
use RusakovNikita\MysqlExam\Exam\ExaminationSheet;
use RusakovNikita\MysqlExam\Exam\Question;
use RusakovNikita\MysqlExam\Exam\Student;

class ExaminationSheetAdmin
{
    public function __construct(private ExaminationSheetIdGenerator $generator, private ExaminationSheetRepository $repository)
    {
    }

    public function createExaminationSheet(Student $student, Exam $exam): ExaminationSheet
    {
        return new ExaminationSheet($this->generator->generateExaminationSheetId(), $student, $exam);
    }

    public function saveExaminationSheet(ExaminationSheet $sheet): void
    {
        $this->repository->saveExaminationSheet($sheet);
    }

    public function addAnswer(ExaminationSheet $sheet, Answer $answer)
    {
        $this->repository->saveExaminationSheet($sheet->addAnswer($answer));
    }

    public function getStartQuestion(ExaminationSheet $sheet): Question
    {
        return $sheet->getExam()->getStartQuestion();
    }

    public function getNextQuestion(ExaminationSheet $sheet, Question $question): ?Question
    {
        return $sheet->getExam()->getNextQuestion($question);
    }
}