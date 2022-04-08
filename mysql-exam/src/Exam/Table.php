<?php

namespace RusakovNikita\MysqlExam\Exam;

class Table
{
    public function __construct(private TableRow $head, private array $body = [])
    {
    }

    /**
     * @return TableRow
     */
    public function getHead(): TableRow
    {
        return $this->head;
    }

    public function addRow(TableRow $row): Table
    {
        $this->body[] = $row;
        return $this;
    }

    /**
     * @return array
     */
    public function getBody(): array
    {
        return $this->body;
    }
}