<?php

namespace RusakovNikita\MysqlExam\ExaminationSheet;

interface DateTimeManager
{
    public function now(): \DateTimeInterface;
}