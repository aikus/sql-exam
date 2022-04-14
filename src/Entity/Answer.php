<?php

namespace App\Entity;

use App\Repository\AnswerRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AnswerRepository::class)]
class Answer
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'string')]
    private $id;

    #[ORM\ManyToOne(targetEntity: Question::class)]
    #[ORM\JoinColumn(nullable: false)]
    private $question;

    #[ORM\Column(type: 'text')]
    private $sql_text;

    #[ORM\Column(type: 'object', nullable: true)]
    private $result_table;

    #[ORM\Column(type: 'text', nullable: true)]
    private $result_error;

    #[ORM\Column(type: 'datetime', nullable: true)]
    private $start;

    #[ORM\Column(type: 'datetime', nullable: true)]
    private $end;

    #[ORM\ManyToOne(targetEntity: ExaminationSheet::class, inversedBy: 'answers')]
    #[ORM\JoinColumn(nullable: false)]
    private $examinationSheet;

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getQuestion(): ?Question
    {
        return $this->question;
    }

    public function setQuestion(?Question $question): self
    {
        $this->question = $question;

        return $this;
    }

    public function getSqlText(): ?string
    {
        return $this->sql_text;
    }

    public function setSqlText(string $sql_text): self
    {
        $this->sql_text = $sql_text;

        return $this;
    }

    public function getResultTable()
    {
        return $this->result_table;
    }

    public function setResultTable($result_table): self
    {
        $this->result_table = $result_table;

        return $this;
    }

    public function getResultError(): ?string
    {
        return $this->result_error;
    }

    public function setResultError(?string $result_error): self
    {
        $this->result_error = $result_error;

        return $this;
    }

    public function getStart(): ?\DateTimeInterface
    {
        return $this->start;
    }

    public function setStart(?\DateTimeInterface $start): self
    {
        $this->start = $start;

        return $this;
    }

    public function getEnd(): ?\DateTimeInterface
    {
        return $this->end;
    }

    public function setEnd(?\DateTimeInterface $end): self
    {
        $this->end = $end;

        return $this;
    }

    public function getExaminationSheet(): ?ExaminationSheet
    {
        return $this->examinationSheet;
    }

    public function setExaminationSheet(?ExaminationSheet $examinationSheet): self
    {
        $this->examinationSheet = $examinationSheet;

        return $this;
    }
}
