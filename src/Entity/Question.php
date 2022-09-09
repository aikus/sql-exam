<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\QuestionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: QuestionRepository::class)]
#[ApiResource]
class Question
{
    #[ORM\Id]
    #[ORM\Column(type: 'string')]
    private $id;

    #[ORM\Column(type: 'text')]
    private $content;

    #[ORM\Column(type: 'smallint')]
    private $timeLimit;

    #[ORM\Column(type: 'integer')]
    private $ord;

    #[ORM\ManyToOne(targetEntity: Exam::class, inversedBy: 'questions')]
    #[ORM\JoinColumn(nullable: false)]
    private $exam;

    #[ORM\ManyToMany(targetEntity: ExaminationSheet::class, mappedBy: 'questions')]
    private $examinationSheets;

    #[ORM\OneToMany(mappedBy: 'question', targetEntity: RightAnswer::class)]
    private $rightAnswers;

    public function __construct()
    {
        $this->examinationSheets = new ArrayCollection();
        $this->rightAnswers = new ArrayCollection();
    }

    public function getId(): ?string
    {
        return $this->id;
    }

    public function setId(string $id)
    {
        $this->id = $id;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

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

    public function getOrd(): ?int
    {
        return $this->ord;
    }

    public function setOrd(int $ord): self
    {
        $this->ord = $ord;

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
     * @return Collection<int, ExaminationSheet>
     */
    public function getExaminationSheets(): Collection
    {
        return $this->examinationSheets;
    }

    public function addExaminationSheet(ExaminationSheet $examinationSheet): self
    {
        if (!$this->examinationSheets->contains($examinationSheet)) {
            $this->examinationSheets[] = $examinationSheet;
            $examinationSheet->addQuestion($this);
        }

        return $this;
    }

    public function removeExaminationSheet(ExaminationSheet $examinationSheet): self
    {
        if ($this->examinationSheets->removeElement($examinationSheet)) {
            $examinationSheet->removeQuestion($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, RightAnswer>
     */
    public function getRightAnswers(): Collection
    {
        return $this->rightAnswers;
    }

    public function addRightAnswer(RightAnswer $rightAnswer): self
    {
        if (!$this->rightAnswers->contains($rightAnswer)) {
            $this->rightAnswers[] = $rightAnswer;
            $rightAnswer->setQuestion($this);
        }

        return $this;
    }

    public function removeRightAnswer(RightAnswer $rightAnswer): self
    {
        if ($this->rightAnswers->removeElement($rightAnswer)) {
            // set the owning side to null (unless already changed)
            if ($rightAnswer->getQuestion() === $this) {
                $rightAnswer->setQuestion(null);
            }
        }

        return $this;
    }
}
