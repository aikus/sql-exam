<?php

namespace App\Connectors;

class PdoConnection
{
    public function __construct(private \PDO $pdo)
    {
    }

    public function fetchAll(string $sql)
    {
        $statement = $this->pdo->prepare($sql);
        $statement->execute();
        return $statement->fetchAll(\PDO::FETCH_ASSOC);
    }
}