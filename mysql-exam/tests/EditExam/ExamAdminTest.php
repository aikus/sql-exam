<?php

namespace RusakovNikita\MysqlExam\Tests\EditExam;

use PHPUnit\Framework\TestCase;
use RusakovNikita\MysqlExam\EditExam\ExamAdmin;
use RusakovNikita\MysqlExam\EditExam\ExamIdGenerator;
use RusakovNikita\MysqlExam\EditExam\ExamRepository;
use RusakovNikita\MysqlExam\Exam\Exam;
use RusakovNikita\MysqlExam\Exam\Question;
use RusakovNikita\MysqlExam\Exam\Teacher;

class ExamAdminTest extends TestCase
{

    public function testCreateExam()
    {
        $id = 'abc';
        $idGenerator = \Mockery::mock(ExamIdGenerator::class);
        $idGenerator->shouldReceive('generateExamId')->andReturn($id);
        $teacher = \Mockery::mock(Teacher::class);
        $admin = new ExamAdmin($idGenerator, \Mockery::mock(ExamRepository::class));
        $expected = new Exam($id, $teacher);

        $actual = $admin->createExam($teacher);

        $this->assertEquals($expected, $actual);
    }

    public function testGetExam()
    {
        $id = 'id';
        $exam = new Exam($id, \Mockery::mock(Teacher::class));
        $repository = \Mockery::mock(ExamRepository::class);
        $repository->shouldReceive('getExam')
            ->with($id)
            ->andReturn($exam);
        $admin = new ExamAdmin(\Mockery::mock(ExamIdGenerator::class), $repository);

        $actual = $admin->getExam($id);

        $this->assertEquals($exam, $actual);
    }

    public function testSetDescription()
    {
        $id = 'id31';
        $description = 'description';
        $teacher = \Mockery::mock(Teacher::class);
        $exam = new Exam($id, $teacher);


        $repository = $this->getMockBuilder(ExamRepository::class)
            ->onlyMethods(['saveExam', 'getExam', 'deleteExam'])
            ->getMock();
        $repository->expects($this->once())->method('saveExam')
            ->with(new Exam($id, $teacher, $description));

        $admin = new ExamAdmin(\Mockery::mock(ExamIdGenerator::class), $repository);
        $admin->setDescription($exam, $description);
    }

    public function testAddQuestion()
    {
        $id = 'id31';
        $description = 'description';
        $teacher = \Mockery::mock(Teacher::class);
        $exam = new Exam($id, $teacher, $description);
        $question = new Question('test', 10);

        $repository = $this->getMockBuilder(ExamRepository::class)
            ->onlyMethods(['saveExam', 'getExam', 'deleteExam'])
            ->getMock();
        $repository->expects($this->once())->method('saveExam')
            ->with(new Exam($id, $teacher, $description, [$question]));

        $admin = new ExamAdmin(\Mockery::mock(ExamIdGenerator::class), $repository);
        $admin->addQuestion($exam, $question);
    }

    public function testRemoveQuestion()
    {
        $id = 'id31';
        $description = 'description';
        $teacher = \Mockery::mock(Teacher::class);
        $question = new Question('test', 10, );
        $exam = new Exam($id, $teacher, $description, [$question]);

        $repository = $this->getMockBuilder(ExamRepository::class)
            ->onlyMethods(['saveExam', 'getExam', 'deleteExam'])
            ->getMock();
        $repository->expects($this->once())->method('saveExam')
            ->with(new Exam($id, $teacher, $description));

        $admin = new ExamAdmin(\Mockery::mock(ExamIdGenerator::class), $repository);

        $admin->removeQuestion($exam, $question);
    }

    public function testDeleteExam()
    {
        $exam = new Exam('id', \Mockery::mock(Teacher::class));

        $repository = $this->getMockBuilder(ExamRepository::class)
            ->onlyMethods(['saveExam', 'getExam', 'deleteExam'])
            ->getMock();
        $repository->expects($this->once())->method('deleteExam')
            ->with($exam);

        $admin = new ExamAdmin(\Mockery::mock(ExamIdGenerator::class), $repository);

        $admin->deleteExam($exam);
    }
}