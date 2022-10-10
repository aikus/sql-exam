<?php

namespace App\Entity\Skill;

use App\Repository\Skill\SkillRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SkillRepository::class)]
class Skill
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $alias = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[ORM\ManyToOne(inversedBy: 'skills')]
    private ?SkillCategory $category = null;

    #[ORM\Column(length: 255)]
    private ?string $check_type = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $create_time = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $update_time = null;

    #[ORM\OneToMany(mappedBy: 'skill', targetEntity: SkillSummary::class)]
    private Collection $skillSummaries;

    public function __construct(\DateTimeInterface $update_time = null)
    {
        $this->skillSummaries = new ArrayCollection();
        $this->update_time = $update_time ?? new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAlias(): ?string
    {
        return $this->alias;
    }

    public function setAlias(string $alias): self
    {
        $this->alias = $alias;

        return $this;
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

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getCategory(): ?SkillCategory
    {
        return $this->category;
    }

    public function setCategory(?SkillCategory $category): self
    {
        $this->category = $category;

        return $this;
    }

    public function getCheckType(): ?string
    {
        return $this->check_type;
    }

    public function setCheckType(string $check_type): self
    {
        $this->check_type = $check_type;

        return $this;
    }

    public function getCreateTime(): ?\DateTimeInterface
    {
        return $this->create_time;
    }

    public function setCreateTime(\DateTimeInterface $create_time): self
    {
        $this->create_time = $create_time;

        return $this;
    }

    public function getUpdateTime(): ?\DateTimeInterface
    {
        return $this->update_time;
    }

    public function setUpdateTime(\DateTimeInterface $update_time): self
    {
        $this->update_time = $update_time;

        return $this;
    }

    /**
     * @return Collection<int, SkillSummary>
     */
    public function getSkillSummaries(): Collection
    {
        return $this->skillSummaries;
    }

    public function addSkillSummary(SkillSummary $skillSummary): self
    {
        if (!$this->skillSummaries->contains($skillSummary)) {
            $this->skillSummaries->add($skillSummary);
            $skillSummary->setSkill($this);
        }

        return $this;
    }

    public function removeSkillSummary(SkillSummary $skillSummary): self
    {
        if ($this->skillSummaries->removeElement($skillSummary)) {
            // set the owning side to null (unless already changed)
            if ($skillSummary->getSkill() === $this) {
                $skillSummary->setSkill(null);
            }
        }

        return $this;
    }
}
