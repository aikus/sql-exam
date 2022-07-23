<?php

namespace App\Controller;

use App\Repository\UserRepository;
use App\Response\ErrorResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

class ConfirmPasswordController extends AbstractController
{
    const AUTH_USER_ERROR = 'Для восстановления пароля необходимо разлогиниться';
    const EMAIL_NOT_FOUND_ERROR = 'Передайте пожалуйста email';
    const USER_NOT_FOUNT_ERROR = 'Пользователь с таким email не найден';

    public function __construct(private Security $security, private UserRepository $repository, MailerInterface $mailer)
    {
    }
    #[Route('/confirm/password', name: 'app_confirm_password')]
    public function index(Request $request): Response
    {//no-reply@nikita-rusakov.ru:AVJNV5YbJUjJvEb
        if($this->security->getUser()) {
            return new ErrorResponse([self::AUTH_USER_ERROR]);
        }
        $email = $request->get('email');
        if(!$email) {
            return new ErrorResponse([self::EMAIL_NOT_FOUND_ERROR]);
        }
        $user = $this->repository->findOneBy(['email' => $email]);
        if(!$user) {
            return new ErrorResponse([self::USER_NOT_FOUNT_ERROR]);
        }


        return new JsonResponse(['status' => 'ok', 'message' => 'Сообщение с новым паролем отправлено на указанный email']);

//        return $this->render('confirm_password/index.html.twig', [
//            'controller_name' => 'ConfirmPasswordController',
//        ]);
    }
}
