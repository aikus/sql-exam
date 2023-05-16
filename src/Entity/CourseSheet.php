<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CourseSheetRepository;
use DateTimeImmutable;
use DateTimeInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CourseSheetRepository::class)]
#[ApiResource(
    denormalizationContext: ['groups' => ['write']],
    normalizationContext: ['groups' => ['read']],
)]
class CourseSheet
{
    const STATUS_NEW = 'new';
    const STATUS_STARTED = 'started';
    const STATUS_COMPLETED = 'completed';
    const STATUS_RESTARTABLE = 'restartable';
    const STATUSES = [self::STATUS_NEW, self::STATUS_STARTED, self::STATUS_COMPLETED, self::STATUS_RESTARTABLE];
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['write', 'read'])]
    private ?int $id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['write', 'read'])]
    private ?Course $course = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $student = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['write', 'read'])]
    private ?CourseElement $actualElement = null;

    #[ORM\Column(type: 'datetime', nullable: true)]
    #[Groups(['write', 'read'])]
    private ?DateTimeInterface $createdAt = null;

    #[ORM\Column(type: 'datetime', nullable: true)]
    #[Groups(['write', 'read'])]
    private ?DateTimeInterface $updatedAt = null;

    #[ORM\OneToMany(mappedBy: 'courceSheet', targetEntity: CourseAnswer::class, cascade: ["persist"], orphanRemoval: true)]
    #[Groups(['write', 'read'])]
    private Collection $courseAnswers;

    #[ORM\Column(length: 255)]
    #[Groups(['write', 'read'])]
    private ?string $status = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['write', 'read'])]
    private ?DateTimeImmutable $started_at = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['write', 'read'])]
    private ?DateTimeImmutable $finished_at = null;

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

    public function getCreatedAt(): ?DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(DateTimeInterface $updatedAt): self
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

    public function getStatus(): ?string
    {
        return $this->status;
    }

    /**
     * @throws CourseSheetStatusNotFound
     */
    public function setStatus(?string $status): self
    {
        if(!in_array($status, self::STATUSES)) {
            throw new CourseSheetStatusNotFound($status);
        }
        $this->status = $status;

        return $this;
    }

    public function getStartedAt(): ?DateTimeImmutable
    {
        return $this->started_at;
    }

    public function setStartedAt(?DateTimeImmutable $started_at): self
    {
        $this->started_at = $started_at;

        return $this;
    }

    public function getFinishedAt(): ?DateTimeImmutable
    {
        return $this->finished_at;
    }

    public function setFinishedAt(?DateTimeImmutable $finished_at): self
    {
        $this->finished_at = $finished_at;

        return $this;
    }
}
