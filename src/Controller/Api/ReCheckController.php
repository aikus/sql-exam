<?php

namespace App\Controller\Api;

use App\Connectors\AnswerHandler\Factory;
use App\Entity\Course;
use App\Entity\CourseAnswer;
use App\Repository\CourseAnswerRepository;
use App\Repository\CourseSheetRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/re-check')]
class ReCheckController extends AbstractController
{
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
                $result[
                    $answer->getId()
                    .' '
                    .$answer->getCourceSheet()->getStudent()->getFio()
                ] = $this->reCheckAnswer($answer, $answerRepository);
                $count++;
            }
        }
        return new JsonResponse(['count' => $count, 'result' => $result ?? null]);
    }

    private function reCheckAnswer(
        CourseAnswer $answer,
        CourseAnswerRepository $repository
    ): string {
        try {
            $old = $answer->isIsRight();
            $this->factory->getHandler($answer)->handle($answer);
            $repository->add($answer);
            return 'Is changed: ' . $this->stringifyBool($old !== $answer->isIsRight())
                .'. New: '.$this->stringifyBool($answer->isIsRight())
                .'. Old: '.$this->stringifyBool($old)
                .'. Success';
        }
        catch (\Throwable $e) {
            return $e->getMessage();
        }
    }

    private function stringifyBool(?bool $bool): string
    {
        return null === $bool ? '(n)' : ($bool ? '(1)' : '(0)');
    }
}