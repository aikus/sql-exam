<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/react')]
class ReactDevPageController extends AbstractController
{
    #[Route('/', name: 'app_react_dev_page')]
    public function index(): Response
    {
        return $this->render('react/index.html.twig', []);
    }

    #[Route('/{route}', name: 'app_react_dev_route')]
    public function route(string $route): Response
    {
        return $this->render('react/index.html.twig', []);
    }
}