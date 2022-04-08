<?php

namespace RusakovNikita\MysqlExam\Tests\ExaminationSheet;

use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use RusakovNikita\MysqlExam\Exam\Answer;
use RusakovNikita\MysqlExam\Exam\Question;
use RusakovNikita\MysqlExam\Exam\Table;
use RusakovNikita\MysqlExam\Exam\TableRow;
use RusakovNikita\MysqlExam\ExaminationSheet\AnswerAdmin;
use RusakovNikita\MysqlExam\ExaminationSheet\AnswerIdGenerator;
use RusakovNikita\MysqlExam\ExaminationSheet\AnswerRepository;
use RusakovNikita\MysqlExam\ExaminationSheet\QuestionTimeOut;
use RusakovNikita\MysqlExam\ExaminationSheet\SqlExec;
use RusakovNikita\MysqlExam\ExaminationSheet\SqlResult;

class AnswerAdminTest extends TestCase
{
    private $idGenerator;
    private MockObject $repository;
    private AnswerAdmin $admin;
    private $exec;

    public function setUp(): void
    {
        $this->idGenerator = \Mockery::mock(AnswerIdGenerator::class);
        $this->repository = $this->getMockBuilder(AnswerRepository::class)
            ->onlyMethods(['get', 'save'])
            ->getMock();
        $this->exec = \Mockery::mock(SqlExec::class);
        $this->admin = new AnswerAdmin($this->idGenerator, $this->repository, $this->exec);
    }

    public function testCreateAnswer()
    {
        $id = '123';
        $question = new Question('', '');
        $this->idGenerator->shouldReceive('generateAnswerId')->andReturn($id);
        $now = new \DateTime();

        $actual = $this->admin->createAnswer($question, $now);

        $this->assertEquals(new Answer($id, $question, '', null, null, $now), $actual);
    }

    public function testGetAnswer()
    {
        $id = '123';
        $answer = new Answer($id, new Question('', ''), '');

        $this->repository->expects($this->once())
            ->method('get')
            ->with($id)
            ->willReturn($answer);

        $actual = $this->admin->getAnswer($id);

        $this->assertEquals($answer, $actual);
    }
    public function testSaveAnswer()
    {
        $answer = new Answer('$id', new Question('', ''), '');

        $this->repository->expects($this->once())
            ->method('save')
            ->with($answer);

        $this->admin->saveAnswer($answer);
    }

    public function testSetVariant()
    {
        $sql = "SELECT ALL";
        $now = new \DateTime();
        $result = new SqlResult('error', new Table(new TableRow(), []));
        $this->exec->shouldReceive('exec')
            ->with($sql)
            ->andReturn($result);
        $answer = new Answer('id', new Question('', ''), '', null, null, $now);

        $actual = $this->admin->setVariant($answer, $sql, $now);

        $this->assertEquals(new Answer('id', new Question('', ''), $sql, $result->getResult(), $result->getError(), $now, $now), $actual);
    }

    public function testSetVariantTimeOut()
    {
        $this->expectExceptionObject(new QuestionTimeOut());

        $sql = "SELECT ALL";
        $start = new \DateTimeImmutable();
        $now = $start->add(new \DateInterval('PT2S'));
        $answer = new Answer('id', new Question('', '', 1), '', null, null, $start);

        $this->admin->setVariant($answer, $sql, $now);
    }
}