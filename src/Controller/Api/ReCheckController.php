<?php

namespace App\Controller\Api;

use App\Entity\Course;
use App\Service\ReCheck\ReCheck;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/re-check')]
class ReCheckController extends AbstractController
{
    public function __construct(
        private readonly ReCheck $reCheck
    ) {
    }

    #[Route('/{id}', name: 'app_api_re_check', methods: ['GET'])]
    public function index(Course $course): Response {

        return new JsonResponse([
            'status' => 'success',
            'report' => $this->reCheck->run($course),
        ]);
    }
}