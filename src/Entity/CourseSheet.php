<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CourseSheetRepository;
use DateTimeImmutable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CourseSheetRepository::class)]
#[ApiResource]
class CourseSheet
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Course $course = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $student = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?CourseElement $actualElement = null;

    #[ORM\Column]
    private ?DateTimeImmutable $createdAt = null;

    #[ORM\Column]
    private ?DateTimeImmutable $updatedAt = null;

    #[ORM\OneToMany(mappedBy: 'courceSheet', targetEntity: CourseAnswer::class, orphanRemoval: true)]
    private Collection $courseAnswers;

    public function __construct()
    {
        $this->courseAnswers = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCourse(): ?Course
    {
        return $this->course;
    }

    public function setCourse(?Course $course): self
    {
        $this->course = $course;

        return $this;
    }

    public function getStudent(): ?User
    {
        return $this->student;
    }

    public function setStudent(?User $student): self
    {
        $this->student = $student;

        return $this;
    }

    public function getActualElement(): ?CourseElement
    {
        return $this->actualElement;
    }

    public function setActualElement(?CourseElement $actualElement): self
    {
        $this->actualElement = $actualElement;

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

    public function getUpdatedAt(): ?DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(DateTimeImmutable $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * @return Collection<int, CourseAnswer>
     */
    public function getCourseAnswers(): Collection
    {
        return $this->courseAnswers;
    }

    public function addCourseAnswer(CourseAnswer $courseAnswer): self
    {
        if (!$this->courseAnswers->contains($courseAnswer)) {
            $this->courseAnswers->add($courseAnswer);
            $courseAnswer->setCourceSheet($this);
        }

        return $this;
    }

    public function removeCourseAnswer(CourseAnswer $courseAnswer): self
    {
        if ($this->courseAnswers->removeElement($courseAnswer)) {
            // set the owning side to null (unless already changed)
            if ($courseAnswer->getCourceSheet() === $this) {
                $courseAnswer->setCourceSheet(null);
            }
        }

        return $this;
    }
}
