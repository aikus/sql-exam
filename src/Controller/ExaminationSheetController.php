<?php

namespace App\Controller;

use App\Entity\ExaminationSheet;
use App\Form\ExaminationSheetType;
use App\Repository\ExaminationSheetRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/examination/sheet')]
class ExaminationSheetController extends AbstractController
{
    #[Route('/', name: 'app_examination_sheet_index', methods: ['GET'])]
    public function index(ExaminationSheetRepository $examinationSheetRepository): Response
    {
        return $this->render('examination_sheet/index.html.twig', [
            'examination_sheets' => $examinationSheetRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_examination_sheet_new', methods: ['GET', 'POST'])]
    public function new(Request $request, ExaminationSheetRepository $examinationSheetRepository): Response
    {
        $examinationSheet = new ExaminationSheet();
        $form = $this->createForm(ExaminationSheetType::class, $examinationSheet);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $examinationSheetRepository->add($examinationSheet);
            return $this->redirectToRoute('app_examination_sheet_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('examination_sheet/new.html.twig', [
            'examination_sheet' => $examinationSheet,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_examination_sheet_show', methods: ['GET'])]
    public function show(ExaminationSheet $examinationSheet): Response
    {
        return $this->render('examination_sheet/show.html.twig', [
            'examination_sheet' => $examinationSheet,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_examination_sheet_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, ExaminationSheet $examinationSheet, ExaminationSheetRepository $examinationSheetRepository): Response
    {
        $form = $this->createForm(ExaminationSheetType::class, $examinationSheet);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $examinationSheetRepository->add($examinationSheet);
            return $this->redirectToRoute('app_examination_sheet_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('examination_sheet/edit.html.twig', [
            'examination_sheet' => $examinationSheet,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_examination_sheet_delete', methods: ['POST'])]
    public function delete(Request $request, ExaminationSheet $examinationSheet, ExaminationSheetRepository $examinationSheetRepository): Response
    {
        if ($this->isCsrfTokenValid('delete'.$examinationSheet->getId(), $request->request->get('_token'))) {
            $examinationSheetRepository->remove($examinationSheet);
        }

        return $this->redirectToRoute('app_examination_sheet_index', [], Response::HTTP_SEE_OTHER);
    }
}
