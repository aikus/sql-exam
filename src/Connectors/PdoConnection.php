<?php

namespace App\Connectors;

class PdoConnection
{
    public function __construct(private \PDO $pdo)
    {
    }

    public function fetchAll(string $sql): array
    {
        return $this->exec($sql);
    }

    public function getDatabaseData(): array
    {
        $result = [];

        foreach ([
            'contract',
            'payment',
            'person',
            'product',
        ] as $item) {
            $result[$item] = $this->exec("SELECT * FROM `$item` LIMIT 3;");
        }

        return $result;
    }

    private function exec(string $sql): array
    {
        $statement = $this->pdo->prepare($sql);
        $statement->execute();
        return $statement->fetchAll(\PDO::FETCH_ASSOC);
    }
}