<?php

namespace App\Controller;

use App\Entity\Course;
use App\Entity\CourseElement;
use App\Service\ExaminationProcess\ExaminationProcess;
use DateTime;
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
     * @throws Exception
     */
    #[Route('/{id}/start', name: 'app_exam_start', methods: ['GET'])]
    public function start(
        Course $course,
        Security $security,
        ExaminationProcess $process
    ): JsonResponse {

        /** @var Student $user */
        $user = $security->getUser();
        $now = new DateTime();
        return new JsonResponse($process->start($user, $course, $now));
    }

    #[Route('/{course}/next', name: 'app_exam_next', methods: ['GET'])]
    public function next(
        Course $course,
        Security $security,
        ExaminationProcess $process
    ): JsonResponse {

        /** @var Student $user */
        $user = $security->getUser();
        $now = new DateTime();
        return new JsonResponse($process->next($user, $course, $now));
    }
}