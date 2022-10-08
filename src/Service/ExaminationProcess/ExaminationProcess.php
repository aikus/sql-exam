<?php

namespace App\Service\ExaminationProcess;

use App\Connectors\IdGenerator;
use App\Entity\Answer;
use App\Entity\Exam;
use App\Entity\ExaminationSheet;
use App\Entity\Question;
use App\Repository\AnswerRepository;
use App\Repository\ExaminationSheetRepository;
use DateTimeInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Exception;
use RusakovNikita\MysqlExam\Exam\Student;

class ExaminationProcess
{
    public function __construct(
        private readonly ExaminationSheetRepository $examinationSheetRepository,
        private readonly AnswerRepository $answerRepository,
        private readonly IdGenerator $idGenerator
    ) {
    }

    /**
     * @throws OptimisticLockException
     * @throws ORMException
     * @throws Exception
     */
    public function start(
        Student $student,
        Exam $exam,
        DateTimeInterface $now
    ): array {

        $iterator = $exam->getQuestions()->getIterator();
        $iterator->uasort(function (Question $a, Question $b) {
            return $a->getOrd() <=> $b->getOrd();
        });

        $question = (new ArrayCollection(iterator_to_array($iterator)))->first();

        $examSheet = $this->createSheet($this->idGenerator->generateExaminationSheetId(), $student, $exam);

        $answer = $this->createAnswer($this->idGenerator->generateAnswerId(), $question, $examSheet, $now);

        return [
            'examinationSheet' => $examSheet->getId(),
            'answer' => $answer->getId(),
            'question' => $question->getId(),
        ];
    }

    /**
     * @throws OptimisticLockException
     * @throws ORMException
     */
    public function next(
        Student $student,
        Exam $exam,
        Question $currentQuestion,
        DateTimeInterface $now
    ): array {

        $examSheet = $this->examinationSheetRepository->findOneBy([
            'student' => $student,
            'exam' => $exam,
        ]);

        $nextQuestion = $exam->getQuestions()->filter(function (Question $question) use ($currentQuestion) {
            return (int) ($currentQuestion->getOrd() + 2) === (int) $question->getOrd();
        })->first();

        if (!$nextQuestion) {
            return [
                'examinationSheet' => $examSheet->getId(),
                'answer' => null,
                'question' => null,
            ];
        }

        $answer = $this->createAnswer($this->idGenerator->generateAnswerId(), $nextQuestion, $examSheet, $now);

        return [
            'examinationSheet' => $examSheet->getId(),
            'answer' => $answer->getId(),
            'question' => $answer->getQuestion()->getId(),
        ];
    }

    /**
     * @throws OptimisticLockException
     * @throws ORMException
     */
    private function createAnswer(
        string $newAnswerId,
        Question $question,
        ExaminationSheet $sheet,
        DateTimeInterface $now
    ): Answer {

        $answer = new Answer();
        $answer->setStart($now);
        $answer->setEnd($now);
        $answer->setId($newAnswerId);
        $answer->setQuestion($question);
        $answer->setExaminationSheet($sheet);
        $this->answerRepository->add($answer);

        return $answer;
    }

    /**
     * @throws OptimisticLockException
     * @throws ORMException
     */
    private function createSheet(
        string $newExamSheetId,
        Student $student,
        Exam $exam
    ): ExaminationSheet {

        $examSheet = new ExaminationSheet();
        $examSheet->setId($newExamSheetId);
        $examSheet->setStudent($student);
        $examSheet->setExam($exam);
        $this->examinationSheetRepository->add($examSheet);

        return $examSheet;
    }
}