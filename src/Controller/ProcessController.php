<?php

namespace App\Controller;

use App\Entity\Course;
use App\Service\ExaminationProcess\ExaminationProcess;
use App\Service\ExaminationProcess\ExaminationProcessException;
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
        try {
            return new JsonResponse([
                'elementId' => $process->start($user, $course, new DateTime())->getId(),
                'elementCount' => $course->getType()->count(),
            ]);
        }
        catch (ExaminationProcessException $e) {
            return new JsonResponse(['message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
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

            $sheet = $process->answer($user, $course, $answerText, new DateTime());

            return new JsonResponse([
                'elementId' => $sheet->getActualElement()->getId(),
                'elementCount' => $course->getType()->count(),
                'result' => $sheet->getCourseAnswers()->last(),
            ]);
        }
        catch (ExaminationProcessException $e) {
            return new JsonResponse(['message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('/{course}/execution', name: 'app_exam_execution', methods: ['POST'])]
    public function execution(
        Course $course,
        Request $request,
        Security $security,
        ExaminationProcess $process
    ): JsonResponse {

        $answerText = $request->get('answerText');
        /** @var Student $user */
        $user = $security->getUser();
        try {

            $sheet = $process->execution($user, $course, $answerText, new DateTime());

            return new JsonResponse([
                'elementId' => $sheet->getActualElement()?->getId(),
                'elementCount' => $course->getType()->count(),
                'result' => $sheet->getCourseAnswers()?->last()->getResult(),
            ]);
        }
        catch (ExaminationProcessException $e) {
            return new JsonResponse(['message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }
}