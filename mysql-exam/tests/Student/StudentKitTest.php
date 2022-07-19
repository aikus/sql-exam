<?php

namespace RusakovNikita\MysqlExam\Tests\Student;

use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use RusakovNikita\MysqlExam\Exam\Exam;
use RusakovNikita\MysqlExam\Exam\Student;
use RusakovNikita\MysqlExam\Exam\Teacher;
use RusakovNikita\MysqlExam\Student\ExaminationRepository;
use RusakovNikita\MysqlExam\Student\ExaminationSheetRepository;
use RusakovNikita\MysqlExam\Student\StudentKit;

class StudentKitTest extends TestCase
{

    private MockObject $examRepository;
    private ExaminationSheetRepository $examinationSheetRepository;
    private StudentKit $kit;

    public function setUp(): void
    {
        $this->examRepository = $this->getMockBuilder(ExaminationRepository::class)
            ->onlyMethods(['getExaminationForStudent'])
            ->getMock();
        $this->examinationSheetRepository = $this->getMockBuilder(ExaminationSheetRepository::class)
            ->onlyMethods(['createExaminationSheet', 'getExaminationSheetById', 'getExaminationByQuestionId'])
            ->getMock();
        $this->kit = new StudentKit($this->examRepository, $this->examinationSheetRepository);
    }

    /**
     * @test
     * @return void
     */
    public function getExaminationSheet()
    {
        $student = $this->getMockBuilder(Student::class)
            ->getMock();
        $teacher = $this->getMockBuilder(Teacher::class)
            ->getMock();
        $examList = [new Exam('id', $teacher)];
        $this->examRepository->expects($this->any())
            ->method("getExaminationForStudent")
            ->with($student)
            ->willReturn($examList);

        $actual = $this->kit->getExaminationSheet($student);

        $this->assertEquals($examList, $actual);
    }
}