<?php

namespace App\Entity;

use App\Repository\SkillQuarterRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SkillQuarterRepository::class)]
class SkillQuarter
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $alias = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $create_time = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $update_time = null;

    #[ORM\OneToMany(mappedBy: 'quarter', targetEntity: SkillSummary::class)]
    private Collection $skillSummaries;

    public function __construct()
    {
        $this->skillSummaries = new ArrayCollection();
        $this->update_time = new \DateTime();
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
            $skillSummary->setQuarter($this);
        }

        return $this;
    }

    public function removeSkillSummary(SkillSummary $skillSummary): self
    {
        if ($this->skillSummaries->removeElement($skillSummary)) {
            // set the owning side to null (unless already changed)
            if ($skillSummary->getQuarter() === $this) {
                $skillSummary->setQuarter(null);
            }
        }

        return $this;
    }
}
