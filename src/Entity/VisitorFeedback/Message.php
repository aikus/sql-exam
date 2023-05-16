<?php

namespace App\Entity\VisitorFeedback;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Connectors\VisitorFeedback\MessageListener;
use App\Entity\User;
use App\Repository\VisitorFeedback\MessageRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use DateTimeInterface;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\MaxDepth;

#[ApiResource(
    denormalizationContext: ['groups' => ['write']],
    normalizationContext: ['groups' => ['read']],
)]
#[ORM\EntityListeners([MessageListener::class])]
#[ORM\Entity(repositoryClass: MessageRepository::class)]
#[ORM\Table(name: 'visitor_feedback_message')]
class Message
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read'])]
    private ?int $id = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['write', 'read'])]
    private ?string $message = null;

    #[ORM\Column(length: 255)]
    #[Groups(['write', 'read'])]
    private ?string $fio = null;

    #[ORM\Column(length: 255)]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['write', 'read'])]
    private ?string $contact = null;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: true, onDelete: 'SET NULL')]
    private ?User $creator = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['read'])]
    private ?DateTimeInterface $create_time;

    #[ORM\OneToMany(mappedBy: 'visitorFeedbackMessage', targetEntity: Screenshot::class)]
    #[Groups(['read'])]
    private Collection $screenshots;

    public function __construct()
    {
        $this->create_time = new \DateTimeImmutable();
        $this->screenshots = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(string $message): self
    {
        $this->message = $message;

        return $this;
    }

    public function getFio(): ?string
    {
        return $this->fio;
    }

    public function setFio(string $fio): self
    {
        $this->fio = $fio;

        return $this;
    }

    public function getContact(): ?string
    {
        return $this->contact;
    }

    public function setContact(?string $contact): self
    {
        $this->contact = $contact;

        return $this;
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

    public function getCreateTime(): ?DateTimeInterface
    {
        return $this->create_time;
    }

    /**
     * @return Collection<int, Screenshot>
     */
    public function getScreenshots(): Collection
    {
        return $this->screenshots;
    }

    public function addScreenshot(Screenshot $screenshot): self
    {
        if (!$this->screenshots->contains($screenshot)) {
            $this->screenshots->add($screenshot);
            $screenshot->setVisitorFeedbackMessage($this);
        }

        return $this;
    }

    public function removeScreenshot(Screenshot $screenshot): self
    {
        if ($this->screenshots->removeElement($screenshot)) {
            // set the owning side to null (unless already changed)
            if ($screenshot->getVisitorFeedbackMessage() === $this) {
                $screenshot->setVisitorFeedbackMessage(null);
            }
        }

        return $this;
    }
}
