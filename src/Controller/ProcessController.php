<?php

namespace App\Controller;

use App\Entity\Exam;
use App\Entity\Question;
use App\Service\ExaminationProcess\ExaminationProcess;
use DateTime;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Exception;
use RusakovNikita\MysqlExam\Exam\Student;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

#[Route('/api-process')]
class ProcessController extends AbstractController
{
    /**
     * @throws OptimisticLockException
     * @throws ORMException
     * @throws Exception
     */
    #[Route('/{id}/start', name: 'app_exam_start', methods: ['GET'])]
    public function start(
        Exam $exam,
        Security $security,
        ExaminationProcess $process
    ): JsonResponse {

        /** @var Student $user */
        $user = $security->getUser();
        $now = new DateTime();
        return new JsonResponse($process->start($user, $exam, $now));
    }

    /**
     * @throws OptimisticLockException
     * @throws ORMException
     */
    #[Route('/{exam}/next/{question}', name: 'app_exam_next', methods: ['GET'])]
    public function next(
        Exam $exam,
        Question $question,
        Security $security,
        ExaminationProcess $process
    ): JsonResponse {

        /** @var Student $user */
        $user = $security->getUser();
        $now = new DateTime();
        return new JsonResponse($process->next($user, $exam, $question, $now));
    }
}