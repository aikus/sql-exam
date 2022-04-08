<?php

namespace RusakovNikita\MysqlExam\Exam;

class ExaminationSheet
{
    public function __construct(private string $id, private Student $student, private Exam $exam, private array $answers = [])
    {
    }

    /**
     * @return string
     */
    public function getId(): string
    {
        return $this->id;
    }

    /**
     * @return Student
     */
    public function getStudent(): Student
    {
        return $this->student;
    }

    /**
     * @return Exam
     */
    public function getExam(): Exam
    {
        return $this->exam;
    }

    /**
     * @return array
     */
    public function getAnswers(): array
    {
        return $this->answers;
    }

    public function addAnswer(Answer $answer): static
    {
        $this->answers[] = $answer;
        return $this;
    }

    /**
     * @param array $answers
     */
    public function setAnswers(array $answers): void
    {
        $this->answers = $answers;
    }
}