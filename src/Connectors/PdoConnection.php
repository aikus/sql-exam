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
            $result[$item]['table'] = $this->exec("SELECT * FROM `$item` LIMIT ".($limit ?? self::VIEW_LIMIT).";", true);
            $result[$item]['count'] = $this->countRow($item);
        }

        return $result;
    }

    public function getColumnMeta(): array
    {
        return $this->columnMeta;
    }

    private function countRow(string $tableName): ?int
    {
        $result = $this->exec("SELECT COUNT(0) as `count` FROM `$tableName`;", true);
        return ($result[0] ?? null)['count'] ?? null;
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