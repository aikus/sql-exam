<?php

namespace App\Controller\Admin;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/admin')]
class Main extends AbstractController
{
    #[Route('/', name: "app_admin_index")]
    public function index(): Response
    {
        return $this->render('admin/main/index.html.twig');
    }
}