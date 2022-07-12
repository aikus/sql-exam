<?php

namespace App\Tests\Connectors\Student;

use App\Connectors\ExamConvertor;
use App\Connectors\Student\ExaminationRepository;
use App\Connectors\TeacherFinder;
use App\Entity\Exam;
use App\Entity\User;
use App\Repository\ExamRepository;
use PHPUnit\Framework\TestCase;

class ExaminationRepositoryTest extends TestCase
{
    /**
     * @test
     * @return void
     */
    public function getExaminationForStudent(): void
    {
        $examId = "exam id";
        $userName = "User Name";
        $user = new User();
        $user->setFio($userName);
        $ormExam = new Exam();
        $ormExam->setId($examId);
        $ormExam->setCreator($user);
        $ormExam->setStatus("test");
        $expected = [new \RusakovNikita\MysqlExam\Exam\Exam($examId, $user, '', [], "test")];
        $ormRepository = $this->getMockBuilder(ExamRepository::class)
            ->onlyMethods(['findAll'])
            ->disableOriginalConstructor()
            ->getMock();
        $converter = new ExamConvertor(new TeacherFinder());
        $ormRepository->expects($this->any())
            ->method('findAll')
            ->willReturn([$ormExam]);
        $repository = new ExaminationRepository($ormRepository, $converter);

        $actual = $repository->getExaminationForStudent(new User());

        $this->assertEquals($expected, $actual);
    }
}