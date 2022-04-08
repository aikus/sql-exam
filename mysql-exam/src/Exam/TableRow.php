<?php

namespace RusakovNikita\MysqlExam\Exam;

class TableRow
{
    public function __construct(private array $values = [])
    {
    }

    public function add(TableValue $value): self
    {
        $this->values[] = $value;
        return $this;
    }

    /**
     * @return array
     */
    public function getValues(): array
    {
        return $this->values;
    }
}