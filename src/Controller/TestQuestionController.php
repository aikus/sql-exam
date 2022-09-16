<?php

namespace App\Controller;

use App\Entity\TestQuestion;
use App\Form\TestQuestionType;
use App\Repository\TestQuestionRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/test/question')]
class TestQuestionController extends AbstractController
{
    #[Route('/', name: 'app_test_question_index', methods: ['GET'])]
    public function index(TestQuestionRepository $testQuestionRepository): Response
    {
        return $this->render('test_question/index.html.twig', [
            'test_questions' => $testQuestionRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_test_question_new', methods: ['GET', 'POST'])]
    public function new(Request $request, TestQuestionRepository $testQuestionRepository): Response
    {
        $testQuestion = new TestQuestion();
        $form = $this->createForm(TestQuestionType::class, $testQuestion);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $testQuestionRepository->add($testQuestion, true);

            return $this->redirectToRoute('app_test_question_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('test_question/new.html.twig', [
            'test_question' => $testQuestion,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_test_question_show', methods: ['GET'])]
    public function show(TestQuestion $testQuestion): Response
    {
        return $this->render('test_question/show.html.twig', [
            'test_question' => $testQuestion,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_test_question_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, TestQuestion $testQuestion, TestQuestionRepository $testQuestionRepository): Response
    {
        $form = $this->createForm(TestQuestionType::class, $testQuestion);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $testQuestionRepository->add($testQuestion, true);

            return $this->redirectToRoute('app_test_question_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('test_question/edit.html.twig', [
            'test_question' => $testQuestion,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_test_question_delete', methods: ['POST'])]
    public function delete(Request $request, TestQuestion $testQuestion, TestQuestionRepository $testQuestionRepository): Response
    {
        if ($this->isCsrfTokenValid('delete'.$testQuestion->getId(), $request->request->get('_token'))) {
            $testQuestionRepository->remove($testQuestion, true);
        }

        return $this->redirectToRoute('app_test_question_index', [], Response::HTTP_SEE_OTHER);
    }
}
