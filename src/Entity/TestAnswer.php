<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\TestAnswerRepository;
use DateTimeImmutable;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TestAnswerRepository::class)]
#[ApiResource]
class TestAnswer
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?TestQuestion $question = null;

    #[ORM\Column(type: Types::ARRAY)]
    private array $variants = [];

    #[ORM\ManyToOne(inversedBy: 'testAnswers')]
    #[ORM\JoinColumn(nullable: false)]
    private ?TestSheet $testSheet = null;

    #[ORM\Column]
    private ?DateTimeImmutable $createdAt = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getQuestion(): ?TestQuestion
    {
        return $this->question;
    }

    public function setQuestion(?TestQuestion $question): self
    {
        $this->question = $question;

        return $this;
    }

    public function getVariants(): array
    {
        return $this->variants;
    }

    public function setVariants(array $variants): self
    {
        $this->variants = $variants;

        return $this;
    }

    public function getTestSheet(): ?TestSheet
    {
        return $this->testSheet;
    }

    public function setTestSheet(?TestSheet $testSheet): self
    {
        $this->testSheet = $testSheet;

        return $this;
    }

    public function getCreatedAt(): ?DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }
}
