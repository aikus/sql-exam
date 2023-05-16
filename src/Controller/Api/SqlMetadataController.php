<?php

namespace App\Controller\Api;

use App\Service\DBConfigure;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/sql-metadata')]
class SqlMetadataController
{
    private DBConfigure $configure;
    public function __construct()
    {
        $this->configure = new DBConfigure();
    }

    #[Route('/index')]
    public function index()
    {
        return new JsonResponse($this->configure->getLabels());
    }
}