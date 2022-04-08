<?php

namespace RusakovNikita\MysqlExam\Tools;

use RusakovNikita\MysqlExam\Exam\Table;
use RusakovNikita\MysqlExam\Exam\TableRow;
use RusakovNikita\MysqlExam\Exam\TableValue;
use RusakovNikita\MysqlExam\ExaminationSheet\SqlExec;
use RusakovNikita\MysqlExam\ExaminationSheet\SqlResult;

class PdoSqlExec implements SqlExec
{
    public function __construct(private \PDO $pdo)
    {
    }

    public function exec(string $sql): SqlResult
    {
        $caption = null;
        $rows = [];
        foreach ($this->pdo->query($sql) as $row) {
            $caption = new TableRow();
            $tableRow = new TableRow();
            foreach ($row as $key => $value) {
                $caption->add(new TableValue($key, TableValue::TYPE_STRING));
                $tableRow->add(new TableValue((string) $value, $this->getValueType($value)));
            }
            $rows[] = $tableRow;
        }
        return new SqlResult('', new Table($caption, $rows));
    }

    private function getValueType($value): string
    {
        if(is_null($value)) {
            return TableValue::TYPE_NULL;
        }
        if(is_numeric($value)) {
            return TableValue::TYPE_NUMBER;
        }
        return TableValue::TYPE_STRING;
    }
}