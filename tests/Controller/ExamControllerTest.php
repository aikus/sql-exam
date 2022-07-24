<?php

namespace RusakovNikita\MysqlExam\Tests\Controller;

use App\Controller\ExamController;
use App\Entity\User;
use App\Repository\ExamRepository;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use RusakovNikita\MysqlExam\Exam\Exam;
use App\Connectors\Student\ExaminationRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Security;

class ExamControllerTest extends TestCase
{

    public function testIndex()
    {
        $user = new User;
        $exam = new Exam(__METHOD__, $user);
        $repository = $this->describeMock(ExaminationRepository::class,
            ['getExaminationForStudent' => [$exam]]);
        $security = $this->describeMock(Security::class, ['getUser' => $user]);
        $controller = $this->getMockBuilder(ExamController::class)
            ->setConstructorArgs([$repository])
            ->onlyMethods(['render'])
            ->getMock();

        $controller->expects($this->once())
            ->method('render')
            ->with('exam/index.html.twig', ['exams' => [$exam]])
            ->willReturn(new Response());

        $result = $controller->index($this->getMockBuilder(ExamRepository::class)->disableOriginalConstructor()->getMock(), $security);

        $this->assertEquals(new Response(), $result);
    }


    private function describeMock(string $class, array $methods): MockObject
    {
        $mock = $this->getMockBuilder($class)
            ->disableOriginalConstructor()
            ->onlyMethods(array_keys($methods))
            ->getMock();
        foreach ($methods as $method => $value) {
            $mock->expects($this->any())
                ->method($method)
                ->willReturn($value);
        }
        return $mock;
    }
}
