<?php

namespace App\Controller\Admin;

use App\Form\CsvDataType;
use App\Service\FileParser\FileParser;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/export')]
class ExportController extends AbstractController
{
    #[Route('/', name: 'app_export_index')]
    public function index(Request $request, FileParser $fileUploader): Response
    {
        $form = $this->createForm(CsvDataType::class);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            /** @var UploadedFile $csvDataFile */
            $csvDataFile = $form->get('data')->getData();

            if ($csvDataFile) {
                $fileUploader->run($csvDataFile);
                die('+++');
            }
        }

        return $this->renderForm('admin/export/export.html.twig', [
            'form' => $form,
        ]);
    }
}