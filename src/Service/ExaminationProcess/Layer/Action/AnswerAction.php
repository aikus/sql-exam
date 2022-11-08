<?php

namespace App\Service\ExaminationProcess\Layer\Action;

use App\Entity\Course;
use App\Entity\User;
use App\Service\ExaminationProcess\Layer\Domain\ExaminationProcessException;
use App\Service\ExaminationProcess\Layer\Domain\Process;
use App\Service\ExaminationProcess\Layer\Responder\Responder;
use DateTimeInterface;
use Exception;

class AnswerAction extends Action
{
    public function __construct(
        readonly private Process $process,
        readonly private User $user,
        readonly ?string $answerText,
        private readonly Course $course,
        readonly private DateTimeInterface $now
    ) {
    }

    /** @throws ExaminationProcessException */
    protected function do(): Responder
    {
        try {
            return $this->process->answer($this->user, $this->course, $this->answerText, $this->now);
        }
        catch (Exception $e) {
            throw new ExaminationProcessException($e->getMessage());
        }
    }
}