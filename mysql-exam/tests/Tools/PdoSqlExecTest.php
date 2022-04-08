<?php

namespace RusakovNikita\MysqlExam\Tests\Tools;

use PHPUnit\Framework\TestCase;
use RusakovNikita\MysqlExam\Exam\Table;
use RusakovNikita\MysqlExam\Exam\TableRow;
use RusakovNikita\MysqlExam\Exam\TableValue;
use RusakovNikita\MysqlExam\ExaminationSheet\SqlResult;
use RusakovNikita\MysqlExam\Tools\PdoSqlExec;

class PdoSqlExecTest extends  TestCase
{
    public function testExec()
    {
        $sql = "SELECT * FROM table;";
        $iterator = new \ArrayIterator([
            ['id' => 1, 'name' => 'name'],
            ['id' => 2, 'name' => 'name2'],
        ]);
        $result = $this->getMockBuilder(\PDOStatement::class)
            ->onlyMethods(['getIterator'])
            ->getMock();
        $result->expects($this->any())
            ->method('getIterator')
            ->willReturn($iterator);
        $pdo = $this->getMockBuilder(\PDO::class)
            ->disableOriginalConstructor()
            ->onlyMethods(['query'])
            ->getMock();
        $pdo->expects($this->once())
            ->method('query')
            ->with($sql)
            ->willReturn($result);
        $executor = new PdoSqlExec($pdo);

        $actual = $executor->exec($sql);

        $this->assertEquals(new SqlResult('', new Table(
            new TableRow([new TableValue('id', TableValue::TYPE_STRING), new TableValue('name', TableValue::TYPE_STRING)]),
            [
                new TableRow([
                    new TableValue('1', TableValue::TYPE_NUMBER),
                    new TableValue('name', TableValue::TYPE_STRING),
                ]),
                new TableRow([
                    new TableValue('2', TableValue::TYPE_NUMBER),
                    new TableValue('name2', TableValue::TYPE_STRING),
                ]),
            ]
        )), $actual);
    }
}