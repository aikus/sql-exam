<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Connectors\AnswerListener;
use App\Repository\AnswerRepository;
use DateTimeInterface;
use Doctrine\ORM\Mapping as ORM;

/**
 * Ответы на задания по sql
 */
#[ORM\Entity(repositoryClass: AnswerRepository::class)]
#[ORM\EntityListeners([AnswerListener::class])]
#[ApiResource]
class Answer
{
    #[ORM\Id]
    #[ORM\Column(type: 'string')]
    private $id;

    #[ORM\ManyToOne(targetEntity: Question::class)]
    #[ORM\JoinColumn(nullable: false)]
    private $question;

    /**
     * @var string sql-запрос, по сути значимая часть ответа
     */
    #[ORM\Column(type: 'text')]
    private $sql_text;

    /**
     * @var array результат ответа, который видел студнет во время ответа на вопрос, если запрос был выполнен.
     */
    #[ORM\Column(type: 'array', nullable: true)]
    private $result_table;

    /**
     * @var string Ошбка запроса, отданая базой данных, если при запросе случилась ошибка
     */
    #[ORM\Column(type: 'text', nullable: true)]
    private $result_error;

    #[ORM\Column(type: 'text', nullable: true)]
    private $check_right;

    /**
     * @var
     */
    #[ORM\Column(type: 'datetime', nullable: true)]
    private $start;

    #[ORM\Column(type: 'datetime', nullable: true)]
    private $end;

    #[ORM\ManyToOne(targetEntity: ExaminationSheet::class, inversedBy: 'answers')]
    #[ORM\JoinColumn(nullable: false)]
    private $examinationSheet;

    public function setId(string $id): self
    {
        $this->id = $id;

        return $this;
    }

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getQuestion(): ?Question
    {
        return $this->question;
    }

    public function setQuestion(?Question $question): self
    {
        $this->question = $question;

        return $this;
    }

    public function getSqlText(): ?string
    {
        return $this->sql_text;
    }

    public function setSqlText(string $sql_text): self
    {
        $this->sql_text = $sql_text;

        return $this;
    }

    public function getResultTable(): ?array
    {
        return $this->result_table;
    }

    public function setResultTable(?array $result_table): self
    {
        $this->result_table = $result_table;

        return $this;
    }

    public function getResultError(): ?string
    {
        return $this->result_error;
    }

    public function setResultError(?string $result_error): self
    {
        $this->result_error = $result_error;

        return $this;
    }

    public function getCheckRight(): ?string
    {
        return $this->check_right;
    }

    public function setCheckRight(?string $check_right): self
    {
        $this->check_right = $check_right;

        return $this;
    }

    public function getStart(): ?DateTimeInterface
    {
        return $this->start;
    }

    public function setStart(?DateTimeInterface $start): self
    {
        $this->start = $start;

        return $this;
    }

    public function getEnd(): ?DateTimeInterface
    {
        return $this->end;
    }

    public function setEnd(?DateTimeInterface $end): self
    {
        $this->end = $end;

        return $this;
    }

    public function getExaminationSheet(): ?ExaminationSheet
    {
        return $this->examinationSheet;
    }

    public function setExaminationSheet(?ExaminationSheet $examinationSheet): self
    {
        $this->examinationSheet = $examinationSheet;

        return $this;
    }
}
