<?php

namespace App\Entity;

use App\Repository\SkillSummaryRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SkillSummaryRepository::class)]
class SkillSummary
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'skillSummaries')]
    private ?SkillQuarter $quarter = null;

    #[ORM\ManyToOne(inversedBy: 'skillSummaries')]
    private ?User $user = null;

    #[ORM\ManyToOne(inversedBy: 'skillSummaries')]
    private ?Skill $skill = null;

    #[ORM\ManyToOne(inversedBy: 'skillSummaries')]
    private ?SkillValue $skill_value = null;

    #[ORM\ManyToOne(inversedBy: 'skillSummaries')]
    private ?Team $team = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $create_time = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $update_time = null;

    public function __construct()
    {
        $this->update_time = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getQuarter(): ?SkillQuarter
    {
        return $this->quarter;
    }

    public function setQuarter(?SkillQuarter $quarter): self
    {
        $this->quarter = $quarter;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getSkill(): ?Skill
    {
        return $this->skill;
    }

    public function setSkill(?Skill $skill): self
    {
        $this->skill = $skill;

        return $this;
    }

    public function getSkillValue(): ?SkillValue
    {
        return $this->skill_value;
    }

    public function setSkillValue(?SkillValue $skill_value): self
    {
        $this->skill_value = $skill_value;

        return $this;
    }

    public function getTeam(): ?Team
    {
        return $this->team;
    }

    public function setTeam(?Team $team): self
    {
        $this->team = $team;

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
}
