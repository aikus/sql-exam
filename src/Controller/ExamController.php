<?php

namespace App\Controller;

use App\Entity\Exam;
use App\Form\ExamType;
use App\Repository\ExamRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/exam')]
class ExamController extends AbstractController
{
    #[Route('/', name: 'app_exam_index', methods: ['GET'])]
    public function index(ExamRepository $examRepository): Response
    {
        return $this->render('exam/index.html.twig', [
            'exams' => $examRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_exam_new', methods: ['GET', 'POST'])]
    public function new(Request $request, ExamRepository $examRepository): Response
    {
        $exam = new Exam();
        $form = $this->createForm(ExamType::class, $exam);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $examRepository->add($exam);
            return $this->redirectToRoute('app_exam_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('exam/new.html.twig', [
            'exam' => $exam,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_exam_show', methods: ['GET'])]
    public function show(Exam $exam): Response
    {
        return $this->render('exam/show.html.twig', [
            'exam' => $exam,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_exam_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Exam $exam, ExamRepository $examRepository): Response
    {
        $form = $this->createForm(ExamType::class, $exam);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $examRepository->add($exam);
            return $this->redirectToRoute('app_exam_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('exam/edit.html.twig', [
            'exam' => $exam,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_exam_delete', methods: ['POST'])]
    public function delete(Request $request, Exam $exam, ExamRepository $examRepository): Response
    {
        if ($this->isCsrfTokenValid('delete'.$exam->getId(), $request->request->get('_token'))) {
            $examRepository->remove($exam);
        }

        return $this->redirectToRoute('app_exam_index', [], Response::HTTP_SEE_OTHER);
    }
}
