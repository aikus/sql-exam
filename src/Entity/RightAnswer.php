<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\RightAnswerRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: RightAnswerRepository::class)]
#[ApiResource]
class RightAnswer
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\ManyToOne(targetEntity: Question::class, inversedBy: 'rightAnswers')]
    private ?Question $question;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private ?string $driver;

    #[ORM\Column(type: 'text')]
    private ?string $sql_text;

    #[ORM\Column(type: 'array', nullable: true)]
    private $result;

    public function getId(): ?int
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

    public function getDriver(): ?string
    {
        return $this->driver;
    }

    public function setDriver(?string $driver): self
    {
        $this->driver = $driver;

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

    public function getResult()
    {
        return $this->result;
    }

    public function setResult($result): self
    {
        $this->result = $result;

        return $this;
    }
}
