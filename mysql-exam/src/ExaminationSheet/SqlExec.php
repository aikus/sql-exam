<?php

namespace RusakovNikita\MysqlExam\ExaminationSheet;

interface SqlExec
{
    public function exec(string $sql): SqlResult;
}