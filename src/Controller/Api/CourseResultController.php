<?php

namespace App\Controller\Api;

use App\Entity\Course;
use App\Entity\CourseAnswer;
use App\Entity\CourseElement;
use App\Entity\CourseSheet;
use App\Repository\CourseSheetRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

#[Route('/api')]
class CourseResultController extends AbstractController
{
    public function __construct(private readonly Security $security)
    {
    }

    #[Route('/course/{id}/result', name: 'app_api_course_result')]
    public function index(Course $course, CourseSheetRepository $sheetRepository): Response
    {
        $user = $this->security->getUser();

        if(!$user) {
            return new JsonResponse([]);
        }

        $sheet = $sheetRepository->findOneBy([
            'course' => $course,
            'student' => $user,
        ]);

        $table = [];
        foreach ($course->getType() as $element) {
            $answer = $this->lastAnswer($element, $sheet);
            $table[] = [
                '№' => $element->getOrd(),
                'Вопрос' => $element->getName(),
                'Ответ' => $answer?->getAnswer(),
                'Статус' => $answer?->isIsRight(),
            ];
        }

        return new JsonResponse([
            'courseName' => $course->getName(),
            'head' => [],
            'table' => $table,
        ]);
    }

    /**
     * @throws \Exception
     */
    private function lastAnswer(CourseElement $element, CourseSheet $sheet): ?CourseAnswer
    {
        $iterator = $sheet->getCourseAnswers()->filter(function (CourseAnswer $answer) use ($element) {
            return $answer->getQuestion()->getId() === $element->getId();
        })->getIterator();

        $iterator->uasort(fn(CourseAnswer $a, CourseAnswer $b) => $a->getId() <=> $b->getId());

        return (new ArrayCollection(iterator_to_array($iterator)))->last() ?: null;
    }
}
