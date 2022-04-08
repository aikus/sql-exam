<?php

namespace RusakovNikita\MysqlExam\ExaminationSheet;

use RusakovNikita\MysqlExam\Exam\Table;

class SqlResult
{
    public function __construct(private string $error, private ?Table $result)
    {
    }

    /**
     * @return string
     */
    public function getError(): string
    {
        return $this->error;
    }

    /**
     * @return Table|null
     */
    public function getResult(): ?Table
    {
        return $this->result;
    }
}