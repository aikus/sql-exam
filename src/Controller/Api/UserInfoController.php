<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

class UserInfoController extends AbstractController
{
    public function __construct(private readonly Security $security)
    {
    }

    #[Route('/api/user/info', name: 'api_api_user_info')]
    public function index(): Response
    {
        $user = $this->security->getUser();
        if(!$user) {
            return new JsonResponse([]);
        }

        return new JsonResponse([
            'userFio' => method_exists($user, 'getFio') ? $user->getFio() : null,
            'userIdentifier' => $user->getUserIdentifier(),
            'userId' => $user->getId(),
            'roles' => $user->getRoles(),
            'setting' => [
                'theme' => 'light'
            ],
        ]);
    }
}
