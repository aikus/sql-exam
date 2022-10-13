<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Connectors\CourseListener;
use App\Repository\CourseRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CourseRepository::class)]
#[ORM\EntityListeners([CourseListener::class])]
#[ApiResource(
    normalizationContext: ['groups' => ['read']],
    denormalizationContext: ['groups' => ['write']],
)]
class Course
{
    public const STATUS_ENABLE = 'enable';
    public const STATUS_DISABLE = 'disable';

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['write', 'read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['write', 'read'])]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['write', 'read'])]
    private ?string $description = null;

    #[ORM\Column]
    #[Groups(['write', 'read'])]
    private ?int $timeLimit = null;

    #[ORM\Column(length: 255)]
    #[Groups(['write', 'read'])]
    private ?string $status = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $creator = null;

    #[ORM\OneToMany(mappedBy: 'course', targetEntity: CourseElement::class, orphanRemoval: true)]
    #[Groups(['write', 'read'])]
    private Collection $type;

    public function __construct()
    {
        $this->type = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getTimeLimit(): ?int
    {
        return $this->timeLimit;
    }

    public function setTimeLimit(int $timeLimit): self
    {
        $this->timeLimit = $timeLimit;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getCreator(): ?User
    {
        return $this->creator;
    }

    public function setCreator(?User $creator): self
    {
        $this->creator = $creator;

        return $this;
    }

    /**
     * @return Collection<int, CourseElement>
     */
    public function getType(): Collection
    {
        return $this->type;
    }

    public function addType(CourseElement $type): self
    {
        if (!$this->type->contains($type)) {
            $this->type->add($type);
            $type->setCourse($this);
        }

        return $this;
    }

    public function removeType(CourseElement $type): self
    {
        if ($this->type->removeElement($type)) {
            // set the owning side to null (unless already changed)
            if ($type->getCourse() === $this) {
                $type->setCourse(null);
            }
        }

        return $this;
    }
}
