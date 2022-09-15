<?php

namespace App\Entity;

use App\Repository\SkillValueRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SkillValueRepository::class)]
class SkillValue
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    #[ORM\Column(length: 255)]
    private ?string $value = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $create_time = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $update_time = null;

    #[ORM\OneToMany(mappedBy: 'skill_value', targetEntity: SkillSummary::class)]
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

    public function getValue(): ?string
    {
        return $this->value;
    }

    public function setValue(string $value): self
    {
        $this->value = $value;

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
            $skillSummary->setSkillValue($this);
        }

        return $this;
    }

    public function removeSkillSummary(SkillSummary $skillSummary): self
    {
        if ($this->skillSummaries->removeElement($skillSummary)) {
            // set the owning side to null (unless already changed)
            if ($skillSummary->getSkillValue() === $this) {
                $skillSummary->setSkillValue(null);
            }
        }

        return $this;
    }
}
