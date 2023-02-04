<?php

namespace App\Controller;

use App\Repository\CourseSheetRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

class YouCoursesController extends AbstractController
{
    public function __construct(private Security $security, private CourseSheetRepository $repository)
    {
    }

    #[Route(
        path: '/api-courses/{status}/list',
        name: 'course_list',
        methods: ['GET'],
    )]
    public function __invoke(string $status, Request $request): Response
    {
        $result = [];
        foreach ($this->repository->findBy([
            'status' => $status,
            'student' => $this->security->getUser(),
        ]) as $sheet) {
            $result[] = '/api-platform/courses/' . $sheet->getCourse()->getId();
        }

        return new JsonResponse($result);
    }
}