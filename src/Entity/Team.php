<?php

namespace App\Entity;

use App\Repository\TeamRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TeamRepository::class)]
class Team
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $create_time = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $update_time = null;

    #[ORM\OneToMany(mappedBy: 'team', targetEntity: SkillSummary::class)]
    private Collection $skillSummaries;

    public function __construct()
    {
        $this->skillSummaries = new ArrayCollection();
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

    public function setDescription(string $description): self
    {
        $this->description = $description;

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
            $skillSummary->setTeam($this);
        }

        return $this;
    }

    public function removeSkillSummary(SkillSummary $skillSummary): self
    {
        if ($this->skillSummaries->removeElement($skillSummary)) {
            // set the owning side to null (unless already changed)
            if ($skillSummary->getTeam() === $this) {
                $skillSummary->setTeam(null);
            }
        }

        return $this;
    }
}
