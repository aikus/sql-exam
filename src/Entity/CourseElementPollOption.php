<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Entity\EntityTrait\Timestampable;
use App\Repository\CourseElementPollOptionRepository;
use Doctrine\ORM\Mapping as ORM;

#[ApiResource]
#[ORM\Entity(repositoryClass: CourseElementPollOptionRepository::class)]
class CourseElementPollOption
{
    use Timestampable;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $text = null;

    #[ORM\Column]
    private ?bool $is_right = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getText(): ?string
    {
        return $this->text;
    }

    public function setText(string $text): self
    {
        $this->text = $text;

        return $this;
    }

    public function isIsRight(): ?bool
    {
        return $this->is_right;
    }

    public function setIsRight(bool $is_right): self
    {
        $this->is_right = $is_right;

        return $this;
    }
}
