<?php

namespace App\Entity;

use App\Repository\ExamRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ExamRepository::class)]
class Exam
{
    #[ORM\Id]
    #[ORM\Column(type: 'string')]
    private $id;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    private $creator;

    #[ORM\Column(type: 'text')]
    private $description;

    #[ORM\OneToMany(mappedBy: 'exam', targetEntity: Question::class, orphanRemoval: true)]
    private $questions;

    #[ORM\OneToMany(mappedBy: 'exam', targetEntity: ExaminationSheet::class, orphanRemoval: true)]
    private $examinationSheets;

    #[ORM\Column(type: 'integer', nullable: true)]
    private $timeLimit;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $status;

    public function __construct()
    {
        $this->questions = new ArrayCollection();
        $this->examinationSheets = new ArrayCollection();
    }

    public function getId(): ?string
    {
        return $this->id;
    }

    public function setId(string $id)
    {
        $this->id = $id;
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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection<int, Question>
     */
    public function getQuestions(): Collection
    {
        return $this->questions;
    }

    public function addQuestion(Question $question): self
    {
        if (!$this->questions->contains($question)) {
            $this->questions[] = $question;
            $question->setExam($this);
        }

        return $this;
    }

    public function removeQuestion(Question $question): self
    {
        if ($this->questions->removeElement($question)) {
            // set the owning side to null (unless already changed)
            if ($question->getExam() === $this) {
                $question->setExam(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, ExaminationSheet>
     */
    public function getExaminationSheets(): Collection
    {
        return $this->examinationSheets;
    }

    /**
     * @param int $userId
     * @param bool $isTeacher
     * @return Collection<int, ExaminationSheet>
     */
    public function getExaminationSheetByUserId(int $userId, bool $isTeacher = false): Collection
    {
        if ($isTeacher) {
            return $this->examinationSheets;
        }
        else {
            return $this->examinationSheets->filter(function (ExaminationSheet $examinationSheet, $key) use ($userId) {
                return $examinationSheet->getStudent()->getId() === $userId;
            });
        }
    }

    public function addExaminationSheets(ExaminationSheet $examinationSheets): self
    {
        if (!$this->examinationSheets->contains($examinationSheets)) {
            $this->examinationSheets[] = $examinationSheets;
            $examinationSheets->setExam($this);
        }

        return $this;
    }

    public function removeExaminationSheets(ExaminationSheet $examinationSheets): self
    {
        if ($this->examinationSheets->removeElement($examinationSheets)) {
            // set the owning side to null (unless already changed)
            if ($examinationSheets->getExam() === $this) {
                $examinationSheets->setExam(null);
            }
        }

        return $this;
    }

    public function getTimeLimit(): ?int
    {
        return $this->timeLimit;
    }

    public function setTimeLimit(?int $timeLimit): self
    {
        $this->timeLimit = $timeLimit;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(?string $status): self
    {
        $this->status = $status;

        return $this;
    }
}
