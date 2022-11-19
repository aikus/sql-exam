<?php

namespace App\Controller;

use App\Entity\Course;
use App\Entity\User;
use App\Service\ExaminationProcess\Layer\Action\AnswerAction;
use App\Service\ExaminationProcess\Layer\Action\ExecutionAction;
use App\Service\ExaminationProcess\Layer\Action\FinishAction;
use App\Service\ExaminationProcess\Layer\Action\PreviousStepAction;
use App\Service\ExaminationProcess\Layer\Action\StartAction;
use App\Service\ExaminationProcess\Layer\Domain\ExaminationProcessException;
use App\Service\ExaminationProcess\Layer\Domain\Process;
use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

#[Route('/api-process')]
//#[AsController]
class ProcessController extends AbstractController
{
    #[Route('/{id}/start', name: 'app_process_start', methods: ['GET'])]
    public function start(
        Course $course,
        Security $security,
        Process $process
    ): JsonResponse {
        /** @var User $user */
        $user = $security->getUser();
        $action = new StartAction($process, $user, $course, new DateTime());

        try {
            return new JsonResponse($action->run());
        } catch (ExaminationProcessException $e) {
            return new JsonResponse(['message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('/{course}/answer', name: 'app_process_answer', methods: ['POST'])]
    public function answer(
        Course $course,
        Request $request,
        Security $security,
        Process $process
    ): JsonResponse {

        $answerText = $request->get('answerText');

        /** @var User $user */
        $user = $security->getUser();
        $action = new AnswerAction($process, $user, $answerText, $course, new DateTime());

        try {
            return new JsonResponse($action->run());
        } catch (ExaminationProcessException $e) {
            return new JsonResponse(['message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('/{course}/previous-step', name: 'app_process_previous_step', methods: ['GET'])]
    public function previousStep(
        Course $course,
        Security $security,
        Process $process
    ): JsonResponse {

        /** @var User $user */
        $user = $security->getUser();
        $action = new PreviousStepAction($process, $user, $course, new DateTime());

        try {
            return new JsonResponse($action->run());
        } catch (ExaminationProcessException $e) {
            return new JsonResponse(['message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('/{course}/execution', name: 'app_process_execution', methods: ['POST'])]
    public function execution(
        Course $course,
        Request $request,
        Security $security,
        Process $process
    ): JsonResponse {

        $answerText = $request->get('answerText');

        /** @var User $user */
        $user = $security->getUser();
        $action = new ExecutionAction($process, $user, $answerText, $course, new DateTime());

        try {
            return new JsonResponse($action->run());
        } catch (ExaminationProcessException $e) {
            return new JsonResponse(['message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('/{course}/finish', name: 'app_process_finish', methods: ['POST'])]
    public function finish(
        Course $course,
        Request $request,
        Security $security,
        Process $process
    ): JsonResponse {
        $answerText = $request->get('answerText');

        /** @var User $user */
        $user = $security->getUser();
        $action = new FinishAction($process, $user, $answerText, $course, new DateTime());

        try {
            return new JsonResponse($action->run());
        } catch (ExaminationProcessException $e) {
            return new JsonResponse(['message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

//    #[Route(
//        path: "courses",
//        defaults: [
//            '_api_resource_class' => CourseSheet::class,
//            '_api_operation_name' => '_api_/course_sheets',
//        ],
//        methods: ["GET"],
//    )]
//    public function getCourses(Security $security, CourseSheetRepository $repository): array
//    {
//        $user = $security->getUser();
//        return $repository->findBy(['student' => $user]);
//    }
}