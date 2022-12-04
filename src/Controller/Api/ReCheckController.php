<?php

namespace App\Controller\Api;

use App\Connectors\AnswerHandler\Factory;
use App\Entity\Course;
use App\Entity\CourseAnswer;
use App\Entity\User;
use App\Repository\CourseAnswerRepository;
use App\Repository\CourseSheetRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/re-check')]
class ReCheckController extends AbstractController
{
    private array $userAnswerCountSuccess = [];
    private array $userAnswerCountError = [];
    private array $userAnswerIds = [];

    public function __construct(
        private readonly Factory $factory
    ) {
    }

    #[Route('/{id}', name: 'app_api_re_check', methods: ['GET'])]
    public function index(
        Course $course,
        CourseSheetRepository $sheetRepository,
        CourseAnswerRepository $answerRepository
    ): Response {
        $count = 0;
        foreach ($sheetRepository->findBy(['course' => $course]) as $sheet) {
            foreach ($sheet->getCourseAnswers() as $answer) {
                $students[$answer->getCourceSheet()?->getStudent()->getId()] = $answer->getCourceSheet()?->getStudent();

                $this->reCheckAnswer($answer, $answerRepository);
                $count++;
            }
        }

        return new JsonResponse([
            'status' => 'success',
            'report' => $this->buildReport($count, $students ?? [])
        ]);
    }

    private function buildReport(int $totalCount, array $students): array
    {
        return [
            'totalCount' => $totalCount,
            'studentsReport' => $this->reportByAllStudents($students)
        ];
    }

    private function reportByAllStudents(array $students): array
    {
        foreach ($students as $student) {
            $result[] = $this->reportByOneStudent($student);
        }
        return $result ?? [];
    }

    private function reportByOneStudent(User $user): array
    {
        return [
            'fio' => $user->getFio(),
            'userId' => $user->getId(),
            'answerCountSuccess' => $this->userAnswerCountSuccess[$user->getId()] ?? 0,
            'answerCountError' => $this->userAnswerCountError[$user->getId()] ?? 0,
            'changeCounter' => count($this->userAnswerIds[$user->getId()] ?? []),
            'answerIds' => $this->userAnswerIds[$user->getId()] ?? [],
        ];
    }

    private function reCheckAnswer(
        CourseAnswer $answer,
        CourseAnswerRepository $repository
    ): void {
        $userId = $answer->getCourceSheet()->getStudent()->getId();
        try {
            $old = $answer->isIsRight();
            $this->factory->getHandler($answer)->handle($answer);
            $repository->add($answer);

            if ($old !== $answer->isIsRight()) {
                $this->userAnswerIds[$userId][] = $answer->getId();
            }

            if (isset($this->userAnswerCountSuccess[$userId])) {
                $this->userAnswerCountSuccess[$userId]++;
            }
            else {
                $this->userAnswerCountSuccess[$userId] = 1;
            }
        }
        catch (\Throwable $e) {

            if (isset($this->userAnswerCountError[$userId])) {
                $this->userAnswerCountError[$userId]++;
            }
            else {
                $this->userAnswerCountError[$userId] = 1;
            }
            return;
        }
    }
}