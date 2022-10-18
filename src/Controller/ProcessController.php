<?php

namespace App\Controller;

use App\Entity\Course;
use App\Service\ExaminationProcess\ExaminationProcess;
use DateTime;
use Exception;
use RusakovNikita\MysqlExam\Exam\Student;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
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
        return new JsonResponse([
            'elementId' => $process->start($user, $course, new DateTime())->getId(),
            'elementCount' => $course->getType()->count(),
        ]);
    }

    #[Route('/{course}/answer', name: 'app_exam_answer', methods: ['POST'])]
    public function answer(
        Course $course,
        Request $request,
        Security $security,
        ExaminationProcess $process
    ): JsonResponse {

        $answerText = $request->get('answerText');
        /** @var Student $user */
        $user = $security->getUser();
        try {
            return new JsonResponse([
                'elementId' => $process->answer($user, $course, $answerText, new DateTime())?->getId()
            ]);
        }
        catch (Exception $e) {
            return new JsonResponse(['message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }
}