<?php

namespace RusakovNikita\MysqlExam\Exam;

class Exam
{
    private array $questions = [];

    public function __construct(private string $id,
                                private Teacher $teacher,
                                private string $description = '',
                                array $questions = [],
                                private ?string $status = null
    )
    {
        $this->setQuestions($questions);
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function getTeacher(): Teacher
    {
        return $this->teacher;
    }

    public function setDescription(string $description): Exam
    {
        $this->description = $description;
        return $this;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setQuestions(array $questions): Exam
    {
        /* @var Question $question */
        foreach ($questions as $question) {
            $this->questions[$question->getId()] = $question;
        }
        return $this;
    }

    public function getQuestions(): array
    {
        return $this->questions;
    }

    public function addQuestion(Question $question): Exam
    {
        $this->questions[$question->getId()] = $question;
        return $this;
    }

    public function removeQuestion(Question $question): Exam
    {
        unset($this->questions[$question->getId()]);
        return $this;
    }

    public function getStartQuestion()
    {
        $questions = array_values($this->questions);
        return $questions[0];
    }

    public function getNextQuestion(Question $question): ?Question
    {
        $isFound = false;
        foreach ($this->questions as $nextQuestion) {
            if($isFound) {
                return $nextQuestion;
            }
            if($nextQuestion->getId() == $question->getId()) {
                $isFound = true;
            }
        }
        return null;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): Exam
    {
        $this->status = $status;
        return $this;
    }
}