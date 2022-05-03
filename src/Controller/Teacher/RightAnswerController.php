<?php

namespace App\Controller\Teacher;

use App\Connectors\PdoConnection;
use App\Entity\Question;
use App\Entity\RightAnswer;
use App\Form\RightAnswerType;
use App\Repository\ExamRepository;
use App\Repository\RightAnswerRepository;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\FormError;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/right/answer')]
class RightAnswerController extends AbstractController
{
    public function __construct(private PdoConnection $studentConnection)
    {
    }

    #[Route('/', name: 'app_right_answer_index', methods: ['GET'])]
    public function index(ExamRepository $examRepository): Response
    {
        return $this->render('right_answer/index.html.twig', [
            'exams' => $examRepository->findAll(),
        ]);
    }

    #[Route('/new/{question}', name: 'app_right_answer_new', methods: ['GET', 'POST'])]
    public function new(Question $question, Request $request, RightAnswerRepository $rightAnswerRepository): Response
    {
        $rightAnswer = new RightAnswer();
        $rightAnswer->setQuestion($question);
        $form = $this->createForm(RightAnswerType::class, $rightAnswer);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            try {
                $rightAnswer->setResult($this->studentConnection->fetchAll($rightAnswer->getSqlText()));
            } catch (Exception $e) {
                $form->addError(new FormError($e->getMessage()));
            }

            $rightAnswerRepository->add($rightAnswer);
            return $this->redirectToRoute('app_right_answer_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('right_answer/new.html.twig', [
            'right_answer' => $rightAnswer,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_right_answer_show', methods: ['GET'])]
    public function show(RightAnswer $rightAnswer): Response
    {
        return $this->render('right_answer/show.html.twig', [
            'right_answer' => $rightAnswer,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_right_answer_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, RightAnswer $rightAnswer, RightAnswerRepository $rightAnswerRepository): Response
    {
        $form = $this->createForm(RightAnswerType::class, $rightAnswer);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            try {
                $rightAnswer->setResult($this->studentConnection->fetchAll($rightAnswer->getSqlText()));
            } catch (Exception $e) {
                $form->addError(new FormError($e->getMessage()));
            }

            $rightAnswerRepository->add($rightAnswer);
            return $this->redirectToRoute('app_right_answer_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('right_answer/edit.html.twig', [
            'right_answer' => $rightAnswer,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_right_answer_delete', methods: ['POST'])]
    public function delete(Request $request, RightAnswer $rightAnswer, RightAnswerRepository $rightAnswerRepository): Response
    {
        if ($this->isCsrfTokenValid('delete'.$rightAnswer->getId(), $request->request->get('_token'))) {
            $rightAnswerRepository->remove($rightAnswer);
        }

        return $this->redirectToRoute('app_right_answer_index', [], Response::HTTP_SEE_OTHER);
    }
}
