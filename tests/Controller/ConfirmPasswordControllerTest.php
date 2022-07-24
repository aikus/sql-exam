<?php

namespace App\Tests\Controller;

use App\Controller\ConfirmPasswordController;
use App\Entity\User;
use App\Repository\UserRepository;
use App\Response\ErrorResponse;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;

class ConfirmPasswordControllerTest extends TestCase
{
    const EMAIL = 'email@email.com';
    /**
     * @test
     * @dataProvider indexDataSet
     * @param Response $expected
     * @param UserInterface|null $user
     * @param Request $request
     * @param User $dbUser
     * @return void
     */
    public function index(Response $expected, ?UserInterface $user, Request $request, User $dbUser = null)
    {
        $security = $this->getMockBuilder(Security::class)
            ->disableOriginalConstructor()
            ->onlyMethods(['getUser'])
            ->getMock();
        $repository = $this->getMockBuilder(UserRepository::class)
            ->disableOriginalConstructor()
            ->onlyMethods(['findOneBy'])
            ->getMock();
        $repository->expects($this->any())
            ->method('findOneBy')
            ->with(['email' => self::EMAIL])
            ->willReturn($dbUser);
        $mailer = $this->getMockBuilder(MailerInterface::class)
            ->onlyMethods(['send'])
            ->getMock();
        $controller = new ConfirmPasswordController($security, $repository, $mailer);
        $security->expects($this->once())
            ->method('getUser')
            ->willReturn($user);

        $actual = $controller->index($request);

        $this->assertEquals($expected, $actual);
    }

    public function indexDataSet(): array
    {
        return [
            'Пытается напомнить пароль залогиненный человек' => [
                new ErrorResponse([ConfirmPasswordController::AUTH_USER_ERROR]), new User(), new Request()
            ],
            'Email не передан' => [
                new ErrorResponse([ConfirmPasswordController::EMAIL_NOT_FOUND_ERROR]), null, new Request()
            ],
            'Пользователь не найден' => [
                new ErrorResponse([ConfirmPasswordController::USER_NOT_FOUNT_ERROR]), null, new Request([], [], ['email' => self::EMAIL])
            ]
        ];
    }
}