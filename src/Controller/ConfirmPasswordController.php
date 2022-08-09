<?php

namespace App\Controller;

use App\Repository\UserRepository;
use App\Response\ErrorResponse;
use RandomLib\Generator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mime\Part\TextPart;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

class ConfirmPasswordController extends AbstractController
{
    const AUTH_USER_ERROR = 'Для восстановления пароля необходимо разлогиниться';
    const EMAIL_NOT_FOUND_ERROR = 'Передайте пожалуйста email';
    const USER_NOT_FOUNT_ERROR = 'Пользователь с таким email не найден';

    public function __construct(
        private Security $security,
        private UserRepository $repository,
        private MailerInterface $mailer,
        private UserPasswordHasherInterface $passwordHasher,
        private Generator $generator
    )
    {
    }

    #[Route('/confirm/password', name: 'app_confirm_password')]
    public function index(Request $request): Response
    {//no-reply@nikita-rusakov.ru:AVJNV5YbJUjJvEb
        if ($this->security->getUser()) {
            return new ErrorResponse([self::AUTH_USER_ERROR]);
        }
        $email = $request->get('email');
        if (!$email) {
            return new ErrorResponse([self::EMAIL_NOT_FOUND_ERROR]);
        }
        $user = $this->repository->findOneBy(['email' => $email]);
        if (!$user) {
            return new ErrorResponse([self::USER_NOT_FOUNT_ERROR]);
        }

        $password = $this->generator->generateString(mt_rand(11, 17));
        $user->setPassword($this->passwordHasher->hashPassword($user, $password));
        $this->repository->add($user);

        $mail = new Email();
        $mail->subject("Новый пароль");
        $mail->to($email);
        $mail->from('no-reply@nikita-rusakov.ru');
        $mail->setBody(new TextPart("Ваш новый пароль: '$password'"));
        $this->mailer->send($mail);

        return new JsonResponse(['status' => 'ok', 'message' => 'Сообщение с новым паролем отправлено на указанный email']);
    }
}
