<?php

namespace App\Service\StudentResultTable;

class Responder
{
    public function __construct(private readonly array $data)
    {
    }

    public function getTableHead(): array
    {
        return $this->data[0];
    }

    public function getResults(): array
    {
        return $this->data['results'];
    }
}