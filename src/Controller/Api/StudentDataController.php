<?php

namespace App\Controller\Api;

use App\Connectors\PdoConnection;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/studentData')]
class StudentDataController extends AbstractController
{
    public const DEFAULT_TABLE_ROW_LIMIT = 10;

    public function __construct(private readonly PdoConnection $studentConnection)
    {
    }

    #[Route('/{tableRowLimit}', name: 'app_api_studentData_index', methods: ['GET'])]
    public function index(int $tableRowLimit = null): Response
    {
        return new JsonResponse(
            $this->studentConnection->getDatabaseData($tableRowLimit ?? self::DEFAULT_TABLE_ROW_LIMIT)
        );
    }
}