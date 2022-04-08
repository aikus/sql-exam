<?php

namespace RusakovNikita\MysqlExam\Tests\EditExam;

use PHPUnit\Framework\TestCase;
use RusakovNikita\MysqlExam\EditExam\QuestionAdmin;
use RusakovNikita\MysqlExam\EditExam\QuestionIdGenerator;
use RusakovNikita\MysqlExam\EditExam\QuestionRepository;
use RusakovNikita\MysqlExam\Exam\Question;

class QuestionAdminTest extends TestCase
{
    public function testCreateQuestion()
    {
        $id = 'id';
        $content = 'content';
        $idGenerator = \Mockery::mock(QuestionIdGenerator::class);
        $idGenerator->shouldReceive('generateQuestionId')->andReturn($id);
        $admin = new QuestionAdmin($idGenerator, \Mockery::mock(QuestionRepository::class));

        $question = $admin->createQuestion($content, 0, 0);

        $this->assertEquals(new Question($id, $content), $question);
    }

    public function testSetQuestion()
    {
        $id = 'id';
        $content = 'content';
        $timeLimit = 11;
        $order = 7;
        $repository = $this->getMockBuilder(QuestionRepository::class)
            ->onlyMethods(['saveQuestion'])
            ->getMock();
        $repository->expects($this->once())->method('saveQuestion')->with(new Question($id, $content, $timeLimit, $order));

        $idGenerator = \Mockery::mock(QuestionIdGenerator::class);
        $idGenerator->shouldReceive('generateQuestionId')->andReturn($id);
        $admin = new QuestionAdmin(\Mockery::mock(QuestionIdGenerator::class), $repository);

        $admin->setQuestion(new Question($id, ''), $content, $timeLimit, $order);
    }
}