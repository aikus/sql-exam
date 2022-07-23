<?php

namespace App\Response;

use Symfony\Component\HttpFoundation\JsonResponse;

class ErrorResponse extends JsonResponse
{
    public function __construct(array $errors, int $status = 400)
    {
        parent::__construct([
            'status' => 'error',
            'errors' => $errors,
        ], $status);
    }
}