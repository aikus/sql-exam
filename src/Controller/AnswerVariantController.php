<?php

namespace App\Controller;

use App\Entity\AnswerVariant;
use App\Form\AnswerVariantType;
use App\Repository\AnswerVariantRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/answer/variant')]
class AnswerVariantController extends AbstractController
{
    #[Route('/', name: 'app_answer_variant_index', methods: ['GET'])]
    public function index(AnswerVariantRepository $answerVariantRepository): Response
    {
        return $this->render('answer_variant/index.html.twig', [
            'answer_variants' => $answerVariantRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_answer_variant_new', methods: ['GET', 'POST'])]
    public function new(Request $request, AnswerVariantRepository $answerVariantRepository): Response
    {
        $answerVariant = new AnswerVariant();
        $form = $this->createForm(AnswerVariantType::class, $answerVariant);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $answerVariantRepository->add($answerVariant, true);

            return $this->redirectToRoute('app_answer_variant_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('answer_variant/new.html.twig', [
            'answer_variant' => $answerVariant,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_answer_variant_show', methods: ['GET'])]
    public function show(AnswerVariant $answerVariant): Response
    {
        return $this->render('answer_variant/show.html.twig', [
            'answer_variant' => $answerVariant,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_answer_variant_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, AnswerVariant $answerVariant, AnswerVariantRepository $answerVariantRepository): Response
    {
        $form = $this->createForm(AnswerVariantType::class, $answerVariant);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $answerVariantRepository->add($answerVariant, true);

            return $this->redirectToRoute('app_answer_variant_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('answer_variant/edit.html.twig', [
            'answer_variant' => $answerVariant,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_answer_variant_delete', methods: ['POST'])]
    public function delete(Request $request, AnswerVariant $answerVariant, AnswerVariantRepository $answerVariantRepository): Response
    {
        if ($this->isCsrfTokenValid('delete'.$answerVariant->getId(), $request->request->get('_token'))) {
            $answerVariantRepository->remove($answerVariant, true);
        }

        return $this->redirectToRoute('app_answer_variant_index', [], Response::HTTP_SEE_OTHER);
    }
}
