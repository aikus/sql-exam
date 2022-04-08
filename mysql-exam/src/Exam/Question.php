<?php

namespace RusakovNikita\MysqlExam\Exam;

class Question
{
    public function __construct(private string $id, private string $content, private int $timeLimit = 0, private int $ord = 0)
    {
    }

    /**
     * @param string $content
     * @return Question
     */
    public function setContent(string $content): self
    {
        $this->content = $content;
        return $this;
    }

    /**
     * @param int $timeLimit
     * @return Question
     */
    public function setTimeLimit(int $timeLimit): self
    {
        $this->timeLimit = $timeLimit;
        return $this;
    }

    /**
     * @param int $ord
     * @return Question
     */
    public function setOrd(int $ord): self
    {
        $this->ord = $ord;
        return $this;
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function getTimeLimit(): int
    {
        return $this->timeLimit;
    }

    public function getContent(): string
    {
        return $this->content;
    }

    public function getOrd(): int
    {
        return $this->ord;
    }
}