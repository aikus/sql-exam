<?php

namespace App\Entity;

use App\Repository\ExaminationSheetRepository;
use DateInterval;
use DateTimeImmutable;
use DateTimeInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ExaminationSheetRepository::class)]
class ExaminationSheet
{
    #[ORM\Id]
    #[ORM\Column(type: 'string')]
    private $id;

    #[ORM\ManyToOne(targetEntity: User::class)]
    private $student;

    #[ORM\ManyToOne(targetEntity: Exam::class, inversedBy: 'yes')]
    #[ORM\JoinColumn(nullable: false)]
    private $exam;

    #[ORM\OneToMany(mappedBy: 'examinationSheet', targetEntity: Answer::class, orphanRemoval: true)]
    private $answers;

    public function __construct()
    {
        $this->answers = new ArrayCollection();
    }

    public function setId(string $id): self
    {
        $this->id = $id;

        return $this;
    }

    public function getId(): ?string
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

    public function getExam(): ?Exam
    {
        return $this->exam;
    }

    public function setExam(?Exam $exam): self
    {
        $this->exam = $exam;

        return $this;
    }

    /**
     * @return Collection<int, Answer>
     */
    public function getAnswers(): Collection
    {
        return $this->answers;
    }

    public function addAnswer(Answer $answer): self
    {
        if (!$this->answers->contains($answer)) {
            $this->answers[] = $answer;
            $answer->setExaminationSheet($this);
        }

        return $this;
    }

    public function removeAnswer(Answer $answer): self
    {
        if ($this->answers->removeElement($answer)) {
            // set the owning side to null (unless already changed)
            if ($answer->getExaminationSheet() === $this) {
                $answer->setExaminationSheet(null);
            }
        }

        return $this;
    }

    public function getStart(): ?DateTimeInterface
    {
        if(!$this->getAnswers()) {
            return null;
        }
        $startValue = (new DateTimeImmutable())->add(new DateInterval('P2Y'));
        $minStart = clone $startValue;
        foreach ($this->getAnswers() as $answer) {
            if($minStart > $answer->getStart()) {
                $minStart = $answer->getStart();
            }
        }
        return $minStart == $startValue ? null : $minStart;
    }

    public function getEnd(): ?DateTimeInterface
    {
        if(!$this->getAnswers()) {
            return null;
        }
        $startValue = (new DateTimeImmutable())->sub(new DateInterval('P100Y'));
        $maxDate = clone $startValue;
        foreach ($this->getAnswers() as $answer) {
            $endDate = $answer->getEnd();
            if($endDate && $maxDate < $endDate) {
                $maxDate = $endDate;
            }
        }
        return $maxDate == $startValue ? null : $maxDate;
    }
}
