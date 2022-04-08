<?php

namespace RusakovNikita\MysqlExam\Exam;

class TableValue
{
    const TYPE_STRING = 'string',
        TYPE_NUMBER = 'number',
        TYPE_NULL = 'null';

    public function __construct(private string $value, private string $type)
    {
    }

    /**
     * @return string
     */
    public function getValue(): string
    {
        return $this->value;
    }

    /**
     * @return string
     */
    public function getType(): string
    {
        return $this->type;
    }
}