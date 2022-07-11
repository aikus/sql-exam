<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ReactDevPageController extends AbstractController
{
    #[Route('/react', name: 'app_react_dev_page')]
    public function index(): Response
    {
        return $this->render('react/index.html.twig', []);
    }
}