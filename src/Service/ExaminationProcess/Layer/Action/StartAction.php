<?php

namespace App\Service\ExaminationProcess\Layer\Action;

use App\Entity\Course;
use App\Entity\User;
use App\Service\ExaminationProcess\Layer\Domain\ExaminationProcessException;
use App\Service\ExaminationProcess\Layer\Domain\Process;
use App\Service\ExaminationProcess\Layer\Responder\Responder;
use DateTimeInterface;
use Exception;

class StartAction extends Action
{
    public function __construct(
        readonly private Process $process,
        readonly private User $user,
        private readonly Course $course,
        readonly private DateTimeInterface $now
    ) {
    }

    /** @throws ExaminationProcessException */
    protected function do(): Responder
    {
        try {
            return $this->process->start($this->user, $this->course, $this->now);
        }
        catch (Exception $e) {
            throw new ExaminationProcessException($e->getMessage());
        }
    }
}