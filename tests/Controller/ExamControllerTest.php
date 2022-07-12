<?php

namespace RusakovNikita\MysqlExam\Tests\Controller;

use App\Controller\ExamController;
use App\Entity\User;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use RusakovNikita\MysqlExam\EditExam\ExamRepository;
use RusakovNikita\MysqlExam\Exam\Exam;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Security;

class ExamControllerTest extends TestCase
{

    public function testIndex()
    {
        return;
        $user = new User;
        $exam = new Exam(__METHOD__, $user);
        $repository = $this->describeMock(ExamRepository::class,
            ['findExaminationForStudent' => [$exam]]);
        $security = $this->describeMock(Security::class, ['getUser' => $user]);
        $controller = $this->getMockBuilder(ExamController::class)
            ->setConstructorArgs($repository, $security)
            ->addMethods(['render'])
            ->getMock();

        $controller->expects($this->once())
            ->method('render')
            ->with('exam/index.html.twig', ['exams' => [$exam]])
            ->willReturn(new Response());

        $controller->index();
    }


    private function describeMock(string $class, array $methods): MockObject
    {
        $mock = $this->getMockBuilder($class)
            ->disableOriginalConstructor()
            ->addMethods(array_keys($methods))
            ->getMock();
        foreach ($methods as $method => $value) {
            $mock->expects($this->any())
                ->method($method)
                ->willReturn($value);
        }
        return $mock;
    }
}
