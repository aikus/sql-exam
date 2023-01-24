<?php

namespace App\Service\ReCheck;

use App\Connectors\AnswerHandler\Factory;
use App\Entity\Course;
use App\Entity\CourseAnswer;
use App\Entity\User;
use App\Repository\CourseAnswerRepository;
use App\Repository\CourseSheetRepository;

class ReCheck
{
    private array $userAnswerCountSuccess = [];
    private array $userAnswerCountError = [];
    private array $userAnswerIds = [];

    public function __construct(
        private readonly Factory $factory,
        readonly private CourseSheetRepository $sheetRepository,
        readonly private CourseAnswerRepository $answerRepository
    ) {
    }

    public function run(Course $course): array
    {
        $count = 0;
        foreach ($this->sheetRepository->findBy(['course' => $course]) as $sheet) {
            foreach ($sheet->getCourseAnswers() as $answer) {
                $students[$answer->getCourceSheet()?->getStudent()->getId()] = $answer->getCourceSheet()?->getStudent();

                $this->reCheckAnswer($answer, $this->answerRepository);
                $count++;
            }
        }

        return $this->buildReport($count, $students ?? []);
    }

    private function buildReport(int $totalCount, array $students): array
    {
        return [
            'totalCount' => $totalCount,
            'studentsReport' => $this->reportByAllStudents($students)
        ];
    }

    private function reportByAllStudents(array $students): array
    {
        foreach ($students as $student) {
            $result[] = $this->reportByOneStudent($student);
        }
        return $result ?? [];
    }

    private function reportByOneStudent(User $user): array
    {
        return [
            'fio' => $user->getFio(),
            'userId' => $user->getId(),
            'answerCountSuccess' => $this->userAnswerCountSuccess[$user->getId()] ?? 0,
            'answerCountError' => $this->userAnswerCountError[$user->getId()] ?? 0,
            'changeCounter' => count($this->userAnswerIds[$user->getId()] ?? []),
            'answerIds' => $this->userAnswerIds[$user->getId()] ?? [],
        ];
    }

    private function reCheckAnswer(
        CourseAnswer $answer,
        CourseAnswerRepository $repository
    ): void {
        $userId = $answer->getCourceSheet()->getStudent()->getId();
        try {
            $old = $answer->isIsRight();
            $this->factory->getHandler($answer)->handle($answer);
            $repository->add($answer);

            if ($old !== $answer->isIsRight()) {
                $this->userAnswerIds[$userId][] = $answer->getId();
            }

            if (isset($this->userAnswerCountSuccess[$userId])) {
                $this->userAnswerCountSuccess[$userId]++;
            }
            else {
                $this->userAnswerCountSuccess[$userId] = 1;
            }
        }
        catch (\Throwable $e) {

            if (isset($this->userAnswerCountError[$userId])) {
                $this->userAnswerCountError[$userId]++;
            }
            else {
                $this->userAnswerCountError[$userId] = 1;
            }
            return;
        }
    }
}