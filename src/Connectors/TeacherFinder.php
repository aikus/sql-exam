<?php

namespace App\Connectors;

use App\Entity\User;
use RusakovNikita\MysqlExam\Exam\Teacher;

class TeacherFinder
{
    public function getUserByTeacher(Teacher $teacher): User
    {
        return $teacher;
    }
}