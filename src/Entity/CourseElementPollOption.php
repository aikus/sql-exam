<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Connectors\CourseElementPollOptionListener;
use App\Entity\EntityTrait\Timestampable;
use App\Repository\CourseElementPollOptionRepository;
use Doctrine\ORM\Mapping as ORM;

#[ApiResource]
#[ORM\EntityListeners([CourseElementPollOptionListener::class])]
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

    #[ORM\ManyToOne(inversedBy: 'pollOptions')]
    #[ORM\JoinColumn(nullable: false, onDelete: 'CASCADE')]
    private ?CourseElement $course_element;

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

    public function getCourseElement(): ?CourseElement
    {
        return $this->course_element;
    }

    public function setCourseElement(?CourseElement $course_element): self
    {
        $this->course_element = $course_element;

        return $this;
    }
}
