<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Connectors\CourseAnswerListener;
use App\Repository\CourseAnswerRepository;
use DateTimeInterface;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\EntityListeners([CourseAnswerListener::class])]
#[ORM\Entity(repositoryClass: CourseAnswerRepository::class)]
#[ApiResource]
class CourseAnswer
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(cascade: ["persist"], inversedBy: 'courseAnswers')]
    #[ORM\JoinColumn(nullable: false)]
    private ?CourseSheet $courceSheet = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?CourseElement $question = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $answer = null;

    #[ORM\Column(nullable: true)]
    private ?bool $isRight = null;

    #[ORM\Column(nullable: true)]
    private ?array $result = [];

    #[ORM\Column(nullable: true)]
    private ?DateTimeInterface $created_at = null;

    #[ORM\Column(nullable: true)]
    private ?DateTimeInterface $updated_at = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCourceSheet(): ?CourseSheet
    {
        return $this->courceSheet;
    }

    public function setCourceSheet(?CourseSheet $courceSheet): self
    {
        $this->courceSheet = $courceSheet;

        return $this;
    }

    public function getQuestion(): ?CourseElement
    {
        return $this->question;
    }

    public function setQuestion(?CourseElement $question): self
    {
        $this->question = $question;

        return $this;
    }

    public function getAnswer(): ?string
    {
        return $this->answer;
    }

    public function setAnswer(string $answer): self
    {
        $this->answer = $answer;

        return $this;
    }

    public function isIsRight(): ?bool
    {
        return $this->isRight;
    }

    public function setIsRight(?bool $isRight): self
    {
        $this->isRight = $isRight;

        return $this;
    }

    public function getResult(): ?array
    {
        return $this->result;
    }

    public function setResult(?array $result): self
    {
        $this->result = $result;

        return $this;
    }

    public function getCreatedAt(): ?DateTimeInterface
    {
        return $this->created_at;
    }

    public function setCreatedAt(?DateTimeInterface $created_at): self
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getUpdatedAt(): ?DateTimeInterface
    {
        return $this->updated_at;
    }

    public function setUpdatedAt(?DateTimeInterface $updated_at): self
    {
        $this->updated_at = $updated_at;

        return $this;
    }
}
