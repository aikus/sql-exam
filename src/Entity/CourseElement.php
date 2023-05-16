<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Connectors\CourseElementListener;
use App\Repository\CourseElementRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\EntityListeners([CourseElementListener::class])]
#[ORM\Entity(repositoryClass: CourseElementRepository::class)]
#[ApiResource]
class CourseElement
{
    const TYPE_ARTICLE = 'article';
    const TYPE_MYSQL = 'mysql';
    const TYPE_POSTGRES = 'postgres';
    const TYPE_ORACLE = 'oracle';
    const TYPE_SQL = 'sql';
    const TYPE_POLL = 'poll';
    const TYPE_OPEN_QUESTION = 'open-question';
    const ALL_TYPES = [
        self::TYPE_ARTICLE,
        self::TYPE_MYSQL,
        self::TYPE_POSTGRES,
        self::TYPE_ORACLE,
        self::TYPE_SQL,
        self::TYPE_POLL,
        self::TYPE_OPEN_QUESTION
    ];

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    #[ORM\Column]
    private ?int $ord = null;

    #[ORM\ManyToOne(inversedBy: 'type')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Course $course = null;

    #[ORM\Column(length: 255)]
    private ?string $type = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[ApiProperty(security: "is_granted('ROLE_TEACHER')")]
    private ?string $answer = null;

    #[ORM\Column(nullable: true)]
    #[ApiProperty(security: "is_granted('ROLE_TEACHER')")]
    private array $answerExecutionResult = [];

    #[ORM\Column(length: 255)]
    private ?string $metaType = null;

    /**
     * @return string|null
     */
    public function getMetaType(): ?string
    {
        return $this->metaType;
    }

    /**
     * @param string|null $metaType
     */
    public function setMetaType(?string $metaType): void
    {
        $this->metaType = $metaType;
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

    public function getOrd(): ?int
    {
        return $this->ord;
    }

    public function setOrd(int $ord): self
    {
        $this->ord = $ord;

        return $this;
    }

    public function getCourse(): ?Course
    {
        return $this->course;
    }

    public function setCourse(?Course $course): self
    {
        $this->course = $course;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    /**
     * @throws CourseElementTypeNotFound
     */
    public function setType(string $type): self
    {
        if (!in_array($type, self::ALL_TYPES)) {
            throw new CourseElementTypeNotFound($type);
        }
        $this->type = $type;

        return $this;
    }

    public function getAnswer(): ?string
    {
        return $this->answer;
    }

    public function setAnswer(?string $answer): self
    {
        $this->answer = $answer;

        return $this;
    }

    public function getAnswerExecutionResult(): array
    {
        return $this->answerExecutionResult ?? [];
    }

    public function setAnswerExecutionResult(?array $answerExecutionResult): self
    {
        $this->answerExecutionResult = $answerExecutionResult ?? [];

        return $this;
    }
}
