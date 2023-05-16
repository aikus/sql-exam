<?php

namespace App\Entity\VisitorFeedback;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Metadata\Post;
use App\Controller\VisitorFeedback\ScreenshotAction;
use App\Repository\VisitorFeedback\ScreenshotRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Vich\UploaderBundle\Mapping\Annotation\Uploadable;

#[ApiResource(normalizationContext: ['groups' => ['screenshot:read']])]
#[Post(
    controller: ScreenshotAction::class,
    openapiContext: [
        'requestBody' => [
            'content' => [
                'multipart/form-data' => [
                    'schema' => [
                        'type' => 'object',
                        'properties' => [
                            'file' => [
                                'type' => 'string',
                                'format' => 'binary'
                            ]
                        ]
                    ]
                ]
            ]
        ]
    ],
    validationContext: ['groups' => ['Default', 'screenshot_create']],
    deserialize: false
)]
#[ORM\Entity(repositoryClass: ScreenshotRepository::class)]
#[ORM\Table(name: 'visitor_feedback_screenshot')]
#[Uploadable]
class Screenshot
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $sourceUrl = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $create_time = null;

    #[ORM\ManyToOne(inversedBy: 'screenshots')]
    #[ORM\JoinColumn(nullable: true, onDelete: 'CASCADE')]
    private ?Message $visitorFeedbackMessage = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSourceUrl(): ?string
    {
        return $this->sourceUrl;
    }

    public function setSourceUrl(string $sourceUrl): self
    {
        $this->sourceUrl = $sourceUrl;

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

    public function getVisitorFeedbackMessage(): ?Message
    {
        return $this->visitorFeedbackMessage;
    }

    public function setVisitorFeedbackMessage(?Message $visitorFeedbackMessage): self
    {
        $this->visitorFeedbackMessage = $visitorFeedbackMessage;

        return $this;
    }
}
