<?php

namespace App\Entity;

use App\Entity\Skill\SkillQuarter;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use RusakovNikita\MysqlExam\Exam\Student;
use RusakovNikita\MysqlExam\Exam\Teacher;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
#[UniqueEntity(fields: ['email'], message: 'There is already an account with this email')]
class User implements UserInterface, PasswordAuthenticatedUserInterface, Teacher, Student
{
    public const ROLE_USER = 'ROLE_USER';
    public const ROLE_STUDENT = 'ROLE_STUDENT';
    public const ROLE_TEACHER = 'ROLE_TEACHER';
    public const ROLE_ADMIN = 'ROLE_ADMIN';

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 180, unique: true)]
    private $email;

    #[ORM\Column(type: 'string', length: 180, nullable: true)]
    private ?string $fio;

    #[ORM\Column(type: 'json')]
    private $roles = [];

    #[ORM\Column(type: 'string')]
    private $password;

    #[ORM\OneToMany(mappedBy: 'student', targetEntity: ExaminationSheet::class, orphanRemoval: true)]
    private $examinationSheets;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: SkillQuarter::class)]
    private Collection $quarters;

    public function __construct()
    {
        $this->examinationSheets = new ArrayCollection();
        $this->quarters = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @param Collection $examinationSheets
     * @return $this
     */
    public function setExaminationSheets(Collection $examinationSheets): self
    {
        $this->examinationSheets = $examinationSheets;

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
     * @param string|null $fio
     * @return $this
     */
    public function setFio(?string $fio): self
    {
        $this->fio = $fio;

        return $this;
    }

    /**
     * @return string|null
     */
    public function getFio(): ?string
    {
        return $this->fio;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getName(): string
    {
        return $this->getFio() ?? $this->getEmail();
    }

    /**
     * @return Collection<int, SkillQuarter>
     */
    public function getQuarters(): Collection
    {
        return $this->quarters;
    }

    public function addQuarter(SkillQuarter $quarter): self
    {
        if (!$this->quarters->contains($quarter)) {
            $this->quarters->add($quarter);
            $quarter->setUser($this);
        }

        return $this;
    }

    public function removeQuarter(SkillQuarter $quarter): self
    {
        if ($this->quarters->removeElement($quarter)) {
            // set the owning side to null (unless already changed)
            if ($quarter->getUser() === $this) {
                $quarter->setUser(null);
            }
        }

        return $this;
    }
}
