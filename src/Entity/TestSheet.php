<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\TestSheetRepository;
use DateTimeInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TestSheetRepository::class)]
#[ApiResource]
class TestSheet
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $student = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Test $test = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?DateTimeInterface $startTime = null;

    #[ORM\OneToMany(mappedBy: 'testSheet', targetEntity: TestAnswer::class, orphanRemoval: true)]
    private Collection $testAnswers;

    public function __construct()
    {
        $this->testAnswers = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getTest(): ?Test
    {
        return $this->test;
    }

    public function setTest(?Test $test): self
    {
        $this->test = $test;

        return $this;
    }

    public function getStartTime(): ?DateTimeInterface
    {
        return $this->startTime;
    }

    public function setStartTime(DateTimeInterface $startTime): self
    {
        $this->startTime = $startTime;

        return $this;
    }

    /**
     * @return Collection<int, TestAnswer>
     */
    public function getTestAnswers(): Collection
    {
        return $this->testAnswers;
    }

    public function addTestAnswer(TestAnswer $testAnswer): self
    {
        if (!$this->testAnswers->contains($testAnswer)) {
            $this->testAnswers->add($testAnswer);
            $testAnswer->setTestSheet($this);
        }

        return $this;
    }

    public function removeTestAnswer(TestAnswer $testAnswer): self
    {
        if ($this->testAnswers->removeElement($testAnswer)) {
            // set the owning side to null (unless already changed)
            if ($testAnswer->getTestSheet() === $this) {
                $testAnswer->setTestSheet(null);
            }
        }

        return $this;
    }
}
