<?php

namespace App\Connectors;

class PdoConnection
{
    public const VIEW_LIMIT = 10;

    private array $columnMeta;

    public function __construct(private \PDO $pdo)
    {
    }

    public function fetchAll(string $sql): array
    {
        return $this->exec($sql);
    }

    public function getDatabaseData(int $limit = null): array
    {
        $result = [];

        foreach ([
            'contract',
            'payment',
            'person',
            'product',
        ] as $item) {
            $result[$item] = $this->exec("SELECT * FROM `$item` LIMIT ".($limit ?? self::VIEW_LIMIT).";", true);
        }

        return $result;
    }

    public function getColumnMeta(): array
    {
        return $this->columnMeta;
    }

    private function exec(string $sql, bool $isAssoc = false): array
    {
        $statement = $this->pdo->prepare($sql);
        $statement->execute();

        $colCount = $statement->columnCount();
        for($i=0;$i<$colCount;$i++){
            $this->columnMeta[$i] = $statement->getColumnMeta($i);
        }

        return $statement->fetchAll($isAssoc ? \PDO::FETCH_ASSOC : \PDO::FETCH_NUM);
    }
}