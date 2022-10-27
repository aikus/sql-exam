<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

class AccessController extends AbstractController
{
    public function __construct(private Security $security)
    {
    }

    #[Route('/api-access', name: 'app_acess')]
    public function index(): Response
    {
        $user = $this->security->getUser();
        if(!$user) {
            return new JsonResponse([]);
        }

        return new JsonResponse($user->getRoles());
    }
}
