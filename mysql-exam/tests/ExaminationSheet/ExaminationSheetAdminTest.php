<?php

namespace RusakovNikita\MysqlExam\Tests\ExaminationSheet;

use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use RusakovNikita\MysqlExam\Exam\Answer;
use RusakovNikita\MysqlExam\Exam\Exam;
use RusakovNikita\MysqlExam\Exam\ExaminationSheet;
use RusakovNikita\MysqlExam\Exam\Question;
use RusakovNikita\MysqlExam\Exam\Student;
use RusakovNikita\MysqlExam\Exam\Teacher;
use RusakovNikita\MysqlExam\ExaminationSheet\DateTimeManager;
use RusakovNikita\MysqlExam\ExaminationSheet\ExaminationSheetAdmin;
use RusakovNikita\MysqlExam\ExaminationSheet\ExaminationSheetIdGenerator;
use RusakovNikita\MysqlExam\ExaminationSheet\ExaminationSheetRepository;

class ExaminationSheetAdminTest extends TestCase
{
    private ExaminationSheet $sheet;
    private string $id;
    private Exam $exam;
    private Student $student;
    private MockObject $repository;
    private DateTimeManager $dateTimeManager;

    public function setUp(): void
    {
        $this->id = '3456';
        $this->exam = new Exam('exam', \Mockery::mock(Teacher::class));
        $this->student = \Mockery::mock(Student::class);
        $this->sheet = new ExaminationSheet($this->id, $this->student, $this->exam);
        $this->repository = $this->getMockBuilder(ExaminationSheetRepository::class)
            ->onlyMethods(['saveExaminationSheet'])
            ->getMock();
    }

    public function testCreateExaminationSheet()
    {
        $idGenerator = \Mockery::mock(ExaminationSheetIdGenerator::class);
        $idGenerator->shouldReceive('generateExaminationSheetId')->andReturn($this->id);
        $admin = new ExaminationSheetAdmin($idGenerator, $this->repository);

        $actual = $admin->createExaminationSheet($this->student, $this->exam);

        $this->assertEquals($this->sheet, $actual);
    }

    public function testSaveExaminationSheet()
    {
        $admin = new ExaminationSheetAdmin(\Mockery::mock(ExaminationSheetIdGenerator::class), $this->repository);
        $this->repository->expects($this->once())
            ->method('saveExaminationSheet')
            ->with($this->sheet);

        $admin->saveExaminationSheet($this->sheet);
    }

    public function testAddAnswer()
    {
        $sheet = clone $this->sheet;
        $answer = new Answer('id', new Question('', ''), '');
        $admin = new ExaminationSheetAdmin(\Mockery::mock(ExaminationSheetIdGenerator::class), $this->repository);
        $this->repository->expects($this->once())
            ->method('saveExaminationSheet')
            ->with($this->sheet->addAnswer($answer));

        $admin->addAnswer($sheet, $answer);
    }

    public function testGetStartQuestion()
    {
        $question = new Question('', '');
        $this->exam->addQuestion($question);
        $admin = new ExaminationSheetAdmin(\Mockery::mock(ExaminationSheetIdGenerator::class), $this->repository);

        $actual = $admin->getStartQuestion($this->sheet);

        $this->assertEquals($question, $actual);
    }

    public function testGetNextQuestion()
    {
        $question = new Question('1', '', 0, 1);
        $firstQuestion = new Question('384', '', 0);
        $this->exam->addQuestion($firstQuestion)->addQuestion($question);
        $admin = new ExaminationSheetAdmin(\Mockery::mock(ExaminationSheetIdGenerator::class), $this->repository);

        $actual = $admin->getNextQuestion($this->sheet, $firstQuestion);

        $this->assertEquals($question, $actual);
    }

}