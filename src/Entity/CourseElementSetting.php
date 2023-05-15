<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Connectors\CourseElementSettingListener;
use App\Entity\EntityTrait\Timestampable;
use App\Repository\CourseElementSettingRepository;
use Doctrine\ORM\Mapping as ORM;

#[ApiResource]
#[ORM\EntityListeners([CourseElementSettingListener::class])]
#[ORM\Entity(repositoryClass: CourseElementSettingRepository::class)]
class CourseElementSetting
{
    use Timestampable;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $property = null;

    #[ORM\Column(length: 255)]
    private ?string $value = null;

    #[ORM\ManyToOne(inversedBy: 'settings')]
    private ?CourseElement $course_element = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProperty(): ?string
    {
        return $this->property;
    }

    public function setProperty(string $property): self
    {
        $this->property = $property;

        return $this;
    }

    public function getValue(): ?string
    {
        return $this->value;
    }

    public function setValue(string $value): self
    {
        $this->value = $value;

        return $this;
    }

    public function getCourseElement(): ?CourseElement
    {
        return $this->course_element;
    }

    public function setCourseElement(?CourseElement $course_element): self
    {
        $this->course_element = $course_element;

        return $this;
    }
}
