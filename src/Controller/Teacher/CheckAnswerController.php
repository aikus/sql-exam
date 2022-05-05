<?php

namespace App\Controller\Teacher;

use App\Entity\Exam;
use App\Repository\AnswerRepository;
use App\Repository\UserRepository;
use App\Service\CheckRight\CheckRight;
use App\Service\StudentResultTable\StudentResultTable;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/check/answer')]
class CheckAnswerController extends AbstractController
{
    #[Route('/', name: 'app_check_answer_index')]
    public function index(UserRepository $repository): Response
    {
        return $this->render('teacher/check_answer/index.html.twig', [
            'users' => $repository->findAll(),
        ]);
    }

    #[Route('/run/{exam}', name: 'app_check_answer_run')]
    public function run(
        Exam $exam,
        AnswerRepository $answerRepository,
        CheckRight $checkRight
    ): Response {

        foreach ($exam->getExaminationSheets() as $sheet) {

            $questions = $sheet->getExam()->getQuestions();

            foreach ($questions as $question) {

                $rightAnswer = $question->getRightAnswers()->first() ?: null;
                $answers = $sheet->getAnswersByQuestion($question);

                foreach ($answers as $answer) {
                    if (
                        null !== $rightAnswer
                        && null !== $answer
                    ) {
                        $answer->setCheckRight(
                            $checkRight->run($rightAnswer, $answer)
                        );
                        $answerRepository->add($answer);
                    }
                }
            }
        }

        return $this->redirectToRoute('app_check_answer_results', [
            'exam' => $exam->getId(),
        ], Response::HTTP_SEE_OTHER);
    }

    #[Route('/results/{exam}', name: 'app_check_answer_results')]
    public function results(Exam $exam, StudentResultTable $resultTable): Response
    {
        $responder = $resultTable->responder($exam);

        return $this->render('teacher/check_answer/table_results.html.twig', [
            'head' => $responder->getTableHead(),
            'results' => $responder->getResults(),
        ]);
    }
}