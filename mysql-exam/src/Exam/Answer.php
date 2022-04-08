<?php

namespace RusakovNikita\MysqlExam\Exam;

class Answer
{
    public function __construct(
        private string $id,
        private Question $question,
        private string $sql,
        private ?Table $table = null,
        private ?string $error = null,
        private ?\DateTimeInterface $start = null,
        private ?\DateTimeInterface $end = null)
    {
    }

    /**
     * @param string|null $error
     * @return Answer
     */
    public function setError(?string $error): self
    {
        $this->error = $error;
        return $this;
    }

    /**
     * @return string|null
     */
    public function getError(): ?string
    {
        return $this->error;
    }

    /**
     * @return string
     */
    public function getId(): string
    {
        return $this->id;
    }

    /**
     * @return Question
     */
    public function getQuestion(): Question
    {
        return $this->question;
    }

    /**
     * @param Question $question
     * @return Answer
     */
    public function setQuestion(Question $question): self
    {
        $this->question = $question;
        return $this;
    }

    /**
     * @return string
     */
    public function getSql(): string
    {
        return $this->sql;
    }

    /**
     * @param string $sql
     * @return Answer
     */
    public function setSql(string $sql): self
    {
        $this->sql = $sql;
        return $this;
    }

    /**
     * @return Table
     */
    public function getTable(): Table
    {
        return $this->table;
    }

    /**
     * @param Table $table
     * @return Answer
     */
    public function setTable(Table $table): self
    {
        $this->table = $table;
        return $this;
    }

    /**
     * @return \DateTimeInterface
     */
    public function getStart(): \DateTimeInterface
    {
        return $this->start;
    }

    /**
     * @param \DateTimeInterface $start
     * @return Answer
     */
    public function setStart(\DateTimeInterface $start): self
    {
        $this->start = $start;
        return $this;
    }

    /**
     * @return \DateTimeInterface|null
     */
    public function getEnd(): ?\DateTimeInterface
    {
        return $this->end;
    }

    /**
     * @param \DateTimeInterface|null $end
     * @return Answer
     */
    public function setEnd(?\DateTimeInterface $end): self
    {
        $this->end = $end;
        return $this;
    }
}