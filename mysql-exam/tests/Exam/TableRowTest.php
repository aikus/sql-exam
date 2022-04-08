<?php

namespace RusakovNikita\MysqlExam\Tests\Exam;

use PHPUnit\Framework\TestCase;
use RusakovNikita\MysqlExam\Exam\TableRow;
use RusakovNikita\MysqlExam\Exam\TableValue;

class TableRowTest extends TestCase
{
    public function testAddValue()
    {
        $row = new TableRow();
        $row->add(new TableValue('test', TableValue::TYPE_STRING))
            ->add(new TableValue('10', TableValue::TYPE_NUMBER));

        $actual = $row->getValues();

        $this->assertEquals([new TableValue('test', TableValue::TYPE_STRING), new TableValue('10', TableValue::TYPE_NUMBER)], $actual);
    }
}