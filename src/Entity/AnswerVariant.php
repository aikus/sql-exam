<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\AnswerVariantRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AnswerVariantRepository::class)]
#[ApiResource]
class AnswerVariant
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $contnent = null;

    #[ORM\Column]
    private ?bool $isRight = null;

    #[ORM\ManyToOne(inversedBy: 'answerVariants')]
    #[ORM\JoinColumn(nullable: false)]
    private ?TestQuestion $question = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContnent(): ?string
    {
        return $this->contnent;
    }

    public function setContnent(string $contnent): self
    {
        $this->contnent = $contnent;

        return $this;
    }

    public function isIsRight(): ?bool
    {
        return $this->isRight;
    }

    public function setIsRight(bool $isRight): self
    {
        $this->isRight = $isRight;

        return $this;
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
}
