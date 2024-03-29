<?php

namespace App\Controller\Api;

use App\Entity\Course;
use App\Entity\CourseAnswer;
use App\Entity\CourseElement;
use App\Entity\CourseElementPollOption;
use App\Entity\CourseSheet;
use App\Entity\User;
use App\Repository\CourseSheetRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\Criteria;
use Exception;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Entity;
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

        if (!$user) {
            return new JsonResponse([]);
        }

        $sheet = $sheetRepository->findOneBy([
            'course' => $course,
            'student' => $user,
        ], ['updatedAt' => 'DESC']);

        return new JsonResponse($this->buildStudentCourseResultReport($sheet));
    }

    #[Route('/student/{student}/course/{course}/result', name: 'app_api_student_course_result', methods: ['GET'])]
    #[Entity('user', options: ['id' => 'student'])]
    #[Entity('course', options: ['id' => 'course'])]
    public function studentCourseResult(User $student, Course $course, CourseSheetRepository $sheetRepository): Response
    {
        if (!$this->isOwnerOrAdmin($student)) {
            return new JsonResponse([
                'code' => Response::HTTP_FORBIDDEN,
                'message' => 'Access denied',
            ], Response::HTTP_FORBIDDEN);
        }

        $sheet = $sheetRepository->findOneBy([
            'course' => $course,
            'student' => $student,
        ], ['updatedAt' => 'DESC']);

        return new JsonResponse($this->buildStudentCourseResultReport($sheet));
    }

    #[Route('/student/{id}/statistic/', name: 'app_api_student_statistic', methods: ['GET'])]
    public function studentStatistic(User $student, CourseSheetRepository $sheetRepository): Response
    {
        if (!$this->isOwnerOrAdmin($student)) {
            return new JsonResponse([
                'code' => Response::HTTP_FORBIDDEN,
                'message' => 'Access denied',
            ], Response::HTTP_FORBIDDEN);
        }

        $sheetCollection = $sheetRepository->findBy(['student' => $student]);

        foreach ($sheetCollection as $sheet) {
            $result[] = [
                'params' => [
                    'courseId' => $sheet->getCourse()->getId(),
                    'studentId' => $sheet->getStudent()->getId(),
                ],
                'columns' => [
                    'id' => $sheet->getId(),
                    'courseName' => $sheet->getCourse()->getName(),
                    'sheetStatus' => $sheet->getStatus(),
                    'finishTime' => $sheet->getFinishedAt()?->format('Y.m.d H:i'),
                    'rightCount' => $this->rightAnswerCount($sheet)
                        . ' из ' . $sheet->getCourse()?->getType()->count(),
                ],
            ];
        }

        return new JsonResponse([
            'fio' => $student->getFio(),
            'email' => $student->getEmail(),
            'result' => $result ?? [],
        ]);
    }

    #[Route('/course/{id}/report/', name: 'app_api_course_report', methods: ['GET'])]
    public function report(Course $course, CourseSheetRepository $sheetRepository): Response
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
                'params' => [
                    'courseId' => $courseId,
                    'studentId' => $sheet->getStudent()->getId(),
                ],
                'columns' => [
                    'id' => $sheet->getId(),
                    'fio' => $sheet->getStudent()?->getFio(),
                    'finishTime' => $sheet->getFinishedAt()?->format('Y.m.d H:i'),
                    'rightCount' => $this->rightAnswerCount($sheet)
                        . ' из ' . $sheet->getCourse()?->getType()->count(),
                    'status' => $sheet->getStatus(),
                    'actions' => 'Подробнее',
                ],
            ];
        }

        return new JsonResponse([
            'courses' => $courses ?? [],
        ]);
    }

    #[Route('/course/{id}/statistic/', name: 'app_api_course_statistic', methods: ['GET'])]
    public function statistic(Course $course, CourseSheetRepository $sheetRepository): Response
    {
        $sheetCollection = $sheetRepository->findBy(['course' => $course]);
        /** @var Collection<int, CourseElement> $questionCollection */
        $questionCollection = $sheetCollection[0]?->getCourse()->getType();

        $i = 1;
        foreach ($sheetCollection as $sheet) {
            $answers = $sheet->getCourseAnswers();
            foreach ($questionCollection as $question) {
                if ($this->rightAnswerCountByQuestion($answers, $question) > 0) {
                    if (isset($result[$question->getId()])) {
                        $result[$question->getId()] += 1;
                    }
                    else {
                        $result[$question->getId()] = 1;
                    }
                }
            }
            $i++;
        }

        return new JsonResponse([
            'course' => $course->getName(),
            'labels' => array_map(function (CourseElement $question) {
                return ['id' => $question->getId(), 'name' => $question->getName()];
            }, $questionCollection->toArray()),
            'result' => $result ?? [],
        ]);
    }

    private function rightAnswerCount(CourseSheet $sheet): int
    {
        $questions = $sheet->getCourse()->getType();
        $answers = $sheet->getCourseAnswers();

        $result = 0;
        foreach ($questions as $element) {
            $result += $this->rightAnswerCountByQuestion($answers, $element);
        }

        return $result;
    }

    /**
     * @param Collection<int, CourseAnswer> $answers
     * @param CourseElement $element
     * @return int
     */
    private function rightAnswerCountByQuestion(Collection $answers, CourseElement $element): int
    {
        $result = 0;
        $rightAnswer = $answers->filter(function (CourseAnswer $answer) use ($element) {
            if ($answer->isIsRight()) {
                return $answer->getQuestion()->getId() === $element->getId();
            }
            return false;
        })->last();

        if ($rightAnswer) $result++;

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

        return $lastRightAnswer ?: null;
    }

    private function buildStudentCourseResultReport(CourseSheet $sheet): array
    {
        foreach ($sheet->getCourse()?->getType() ?? [] as $element) {

            if ($this->isDisplayAnswer($element)) {
                continue;
            }

            $answer = $this->lastRightAnswer($element, $sheet);

            $answerText = CourseElement::TYPE_POLL === $element->getType()
                ? $this->listPollOption($answer)
                : $answer?->getAnswer();

            $table[] = [
                '№' => $element->getOrd(),
                'Вопрос' => $element->getName(),
                'Текст вопроса' => $element->getDescription(),
                'Ответ' => $answerText,
                'Статус' => $answer?->isIsRight(),
                "metaData" => [
                    "sheetId" => $sheet->getId(),
                    "answerId" => $answer?->getId(),
                ]
            ];
        }

        return [
            'courseName' => $sheet->getCourse()?->getName(),
            'head' => [],
            'table' => $table ?? [],
            'fio' => $sheet->getStudent()->getFio()
        ];
    }

    private function isDisplayAnswer(CourseElement $element): bool
    {
        return in_array($element->getType(), [
            CourseElement::TYPE_ARTICLE,
            CourseElement::TYPE_OPEN_QUESTION,
        ], true);
    }

    private function listPollOption(?CourseAnswer $answer): string
    {
        $listPollOption = $answer?->getQuestion()
            ->getPollOptions()
            ->filter(function (CourseElementPollOption $option) use ($answer) {
                $studentAnswerIds = json_decode($answer->getAnswer(), true);
                return is_array($studentAnswerIds) && in_array($option->getId(), $studentAnswerIds);
            })->map(function (CourseElementPollOption $option) {
                return $option->getText();
            })->toArray();

        return implode('<br>', $listPollOption ?? ['Вариант не выбран']);
    }

    private function isOwnerOrAdmin(User $student): bool
    {
        return
            $this->security->isGranted(User::ROLE_ADMIN)
            || $this->security->isGranted(User::ROLE_TEACHER)
            || $this->security->getUser()->getUserIdentifier() === $student->getUserIdentifier();
    }
}
