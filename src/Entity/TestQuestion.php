<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\TestQuestionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TestQuestionRepository::class)]
#[ApiResource]
class TestQuestion
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $question = null;

    #[ORM\Column]
    private ?int $rightVariantQty = null;

    #[ORM\ManyToOne(inversedBy: 'testQuestions')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Test $test = null;

    #[ORM\Column]
    private ?int $questionOrder = null;

    #[ORM\OneToMany(mappedBy: 'question', targetEntity: AnswerVariant::class, orphanRemoval: true)]
    private Collection $answerVariants;

    public function __construct()
    {
        $this->answerVariants = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getQuestion(): ?string
    {
        return $this->question;
    }

    public function setQuestion(string $question): self
    {
        $this->question = $question;

        return $this;
    }

    public function getRightVariantQty(): ?int
    {
        return $this->rightVariantQty;
    }

    public function setRightVariantQty(int $rightVariantQty): self
    {
        $this->rightVariantQty = $rightVariantQty;

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

    public function getQuestionOrder(): ?int
    {
        return $this->questionOrder;
    }

    public function setQuestionOrder(int $questionOrder): self
    {
        $this->questionOrder = $questionOrder;

        return $this;
    }

    /**
     * @return Collection<int, AnswerVariant>
     */
    public function getAnswerVariants(): Collection
    {
        return $this->answerVariants;
    }

    public function addAnswerVariant(AnswerVariant $answerVariant): self
    {
        if (!$this->answerVariants->contains($answerVariant)) {
            $this->answerVariants->add($answerVariant);
            $answerVariant->setQuestion($this);
        }

        return $this;
    }

    public function removeAnswerVariant(AnswerVariant $answerVariant): self
    {
        if ($this->answerVariants->removeElement($answerVariant)) {
            // set the owning side to null (unless already changed)
            if ($answerVariant->getQuestion() === $this) {
                $answerVariant->setQuestion(null);
            }
        }

        return $this;
    }
}
