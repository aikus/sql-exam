<?php

namespace App\Controller\Api;

use App\Entity\Course;
use App\Entity\CourseAnswer;
use App\Entity\CourseElement;
use App\Entity\CourseSheet;
use App\Entity\User;
use App\Repository\CourseSheetRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Criteria;
use Exception;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Entity;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
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

    #[Route('/course/{id}/result', name: 'app_api_course_result', methods: ['GET'])]
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

        return new JsonResponse($this->buildStudentCourseResultReport($sheet));
    }

    #[Route('/student/{student}/course/{course}/result', name: 'app_api_student_course_result', methods: ['GET'])]
    #[Entity('user', options: ['id' => 'student'])]
    #[Entity('course', options: ['id' => 'course'])]
    public function studentCourseResult(User $student, Course $course, CourseSheetRepository $sheetRepository): Response
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $sheet = $sheetRepository->findOneBy([
            'course' => $course,
            'student' => $student,
        ]);

        return new JsonResponse($this->buildStudentCourseResultReport($sheet));
    }

    #[Route('/course/{id}/report/', name: 'app_api_course_report', methods: ['GET'])]
    public function report(Course $course,CourseSheetRepository $sheetRepository): Response
    {
        /** @var CourseSheet[] $allSheet */
        $allSheet = $sheetRepository->matching(
            Criteria::create()
                ->where(Criteria::expr()->neq('status', ''))
                ->andWhere(Criteria::expr()->neq('status', 'new'))
                ->andWhere(Criteria::expr()->eq('course', $course))
                ->setMaxResults(500)
        );

        foreach ($allSheet as $sheet) {

            $courseId = $sheet->getCourse()->getId();

            $courses['/api-platform/courses/' . $courseId]['title'] = $sheet->getCourse()->getName();
            $courses['/api-platform/courses/' . $courseId]['courseId'] = $sheet->getCourse()->getId();
            $courses['/api-platform/courses/' . $courseId]['data'][] = [
                'id' => [
                    'value' => $sheet->getId()
                ],
                'fio' => [
                    'value' => $sheet->getStudent()?->getFio(),
                ],
                'finishTime' => [
                    'value' => $sheet->getFinishedAt()?->format('Y.m.d H:i')
                ],
                'rightCount' => [
                    'value' => $this->rightAnswerCount($sheet)
                        . ' из ' . $sheet->getCourse()?->getType()->count(),
                ],
                'status' => [
                    'value' => $sheet->getStatus(),
                ],
                'actions' => [
                    'value' => 'Подробнее',
                    'params' => ['courseId' => $courseId, 'studentId' => $sheet->getStudent()->getId()]
                ],
            ];
        }

        return new JsonResponse([
            'courses' => $courses ?? [],
        ]);
    }

    private function rightAnswerCount(CourseSheet $sheet): int
    {
        $questions = $sheet->getCourse()->getType();
        $answers = $sheet->getCourseAnswers();

        $result = 0;
        foreach ($questions as $element) {
            $rightAnswer = $answers->filter(function (CourseAnswer $answer) use ($element) {
                if ($answer->isIsRight()) {
                    return $answer->getQuestion()->getId() === $element->getId();
                }
                return false;
            })->last();

            if ($rightAnswer) $result++;
        }

        return $result;
    }

    /** @throws Exception */
    private function lastRightAnswer(CourseElement $element, CourseSheet $sheet): ?CourseAnswer
    {
        $lastRightAnswer = $sheet->getCourseAnswers()->filter(function (CourseAnswer $answer) use ($element) {
            if ($answer->isIsRight()) {
                return $answer->getQuestion()->getId() === $element->getId();
            }
            return false;
        })->last();

        if (!$lastRightAnswer) {
            $lastRightAnswer = $sheet->getCourseAnswers()->filter(function (CourseAnswer $answer) use ($element) {
                return $answer->getQuestion()->getId() === $element->getId();
            })->last();
        }

//        $iterator->uasort(fn(CourseAnswer $a, CourseAnswer $b) => $a->getId() <=> $b->getId());

        return $lastRightAnswer ?: null;
    }

    private function buildStudentCourseResultReport(CourseSheet $sheet): array
    {
        foreach ($sheet->getCourse()?->getType() ?? [] as $element) {
            $answer = $this->lastRightAnswer($element, $sheet);
            $table[] = [
                '№' => $element->getOrd(),
                'Вопрос' => $element->getName(),
                'Ответ' => $answer?->getAnswer(),
                'Статус' => $answer?->isIsRight(),
            ];
        }

        return [
            'courseName' => $sheet->getCourse()?->getName(),
            'head' => [],
            'table' => $table ?? [],
            'fio' => $sheet->getStudent()->getFio()
        ];
    }
}
