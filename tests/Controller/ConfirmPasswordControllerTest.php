<?php

namespace App\Tests\Controller;

use App\Controller\ConfirmPasswordController;
use App\Entity\User;
use App\Repository\UserRepository;
use App\Response\ErrorResponse;
use PHPUnit\Framework\TestCase;
use RandomLib\Generator;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mime\Part\TextPart;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
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
        $newPassword = "newPassword";
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
        $generator = $this->getMockBuilder(Generator::class)
            ->disableOriginalConstructor()
            ->onlyMethods(['generateString'])
            ->getMock();
        $hasher = $this->getMockBuilder(UserPasswordHasherInterface::class)
            ->onlyMethods(['hashPassword', 'isPasswordValid', 'needsRehash'])
            ->getMock();

        $controller = new ConfirmPasswordController($security, $repository, $mailer, $hasher, $generator);
        $security->expects($this->once())
            ->method('getUser')
            ->willReturn($user);
        $generator->expects($this->any())
            ->method("generateString")
            ->willReturn($newPassword);

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
            ],
        ];
    }

    public function testSuccessIndex()
    {
        $newPassword = "newPassword";
        $hash = md5($newPassword);
        $dbUser = new User;
        $security = $this->getMockBuilder(Security::class)
            ->disableOriginalConstructor()
            ->onlyMethods(['getUser'])
            ->getMock();
        $repository = $this->getMockBuilder(UserRepository::class)
            ->disableOriginalConstructor()
            ->onlyMethods(['findOneBy', 'add'])
            ->getMock();
        $repository->expects($this->any())
            ->method('findOneBy')
            ->with(['email' => self::EMAIL])
            ->willReturn($dbUser);
        $expectedUser = clone $dbUser;
        $expectedUser->setPassword($hash);
        $repository->expects($this->once())
            ->method('add')
            ->with($expectedUser);
        $mailer = $this->getMockBuilder(MailerInterface::class)
            ->onlyMethods(['send'])
            ->getMock();
        $generator = $this->getMockBuilder(Generator::class)
            ->disableOriginalConstructor()
            ->onlyMethods(['generateString'])
            ->getMock();
        $generator->expects($this->any())
            ->method('generateString')
            ->willReturn($newPassword);
        $hasher = $this->getMockBuilder(UserPasswordHasherInterface::class)
            ->onlyMethods(['hashPassword', 'isPasswordValid', 'needsRehash'])
            ->getMock();
        $hasher->method('hashPassword')
            ->with($dbUser, $newPassword)
            ->willReturn($hash);

        $controller = new ConfirmPasswordController($security, $repository, $mailer, $hasher, $generator);
        $security->expects($this->once())
            ->method('getUser')
            ->willReturn(null);
        $generator->expects($this->any())
            ->method("generateString")
            ->willReturn($newPassword);
        $email = new Email();
        $email->subject("Новый пароль");
        $email->to(self::EMAIL);
        $email->from('no-reply@nikita-rusakov.ru');
        $email->setBody(new TextPart("Ваш новый пароль: '$newPassword'"));
        $mailer->expects($this->once())
            ->method('send')
            ->with($email);

        $actual = $controller->index(new Request([], [], ['email' => self::EMAIL]));

        $this->assertEquals(new JsonResponse(['status' => 'ok', 'message' => 'Сообщение с новым паролем отправлено на указанный email']), $actual);
    }
}