<?php

namespace App\Controller;

use App\Connectors\IdGenerator;
use App\Connectors\PdoConnection;
use App\Connectors\TimeLimitCalculator;
use App\Connectors\TimeLimitExam;
use App\Connectors\TimeLimitQuestion;
use App\Entity\Answer;
use App\Entity\ExaminationSheet;
use App\Entity\Question;
use App\Entity\User;
use App\Form\AnswerType;
use App\Repository\AnswerRepository;
use App\Repository\ExaminationSheetRepository;
use App\Repository\ExamRepository;
use App\Repository\QuestionRepository;
use App\Service\CheckRight\ExamCheckRight;
use DateTime;
use DateTimeInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

#[Route('/answer')]
class AnswerController extends AbstractController
{
    public function __construct(private PdoConnection $studentConnection)
    {
    }

    #[Route('/', name: 'app_answer_index', methods: ['GET'])]
    public function index(
        AnswerRepository $answerRepository,
        Security $security
    ): Response {
        /** @var User $user */
        $user = $security->getUser();
        $answers = $answerRepository->findAll();
        if (
            in_array('ROLE_TEACHER', $user->getRoles())
            || in_array('ROLE_ADMIN', $user->getRoles())
        ) {
            return $this->render('answer/index.html.twig', [
                'answers' => $answers,
            ]);
        }
        else {
            $answersFiltered = [];

            foreach ($answers as $answer) {
                if ($answer->getExaminationSheet()->getStudent()->getId() === $user->getId()) {
                    $answersFiltered[] = $answer;
                }
            }

            return $this->render('answer/index.html.twig', [
                'answers' => $answersFiltered,
            ]);
        }
    }

    #[Route('/new', name: 'app_answer_new', methods: ['GET'])]
    public function new(
        Request                    $request,
        AnswerRepository           $answerRepository,
        ExaminationSheetRepository $examinationSheetRepository,
        ExamRepository             $examRepository,
        QuestionRepository         $questionRepository,
        Security                   $security
    ): Response {
        $start = new DateTime();
        if ($request->get('exam')) {
            /** @var User $user */
            $user = $security->getUser();
            $exam = $examRepository->find($request->get('exam'));
            $sheets = $exam->getExaminationSheetByUserId($user->getId());

            if (!$sheets->isEmpty()) {
                $sheet = $sheets->last();
                $question = $sheet->getQuestions()->last();
            }
            else {
                $questions = $this->getOrderedQuestion($exam->getQuestions()->toArray());
                $question = $questions[0];
                $sheet = new ExaminationSheet();
                $sheet->setExam($exam)
                    ->setStudent($user)
                    ->setId((new IdGenerator())->generateQuestionId());
                $examinationSheetRepository->add($sheet);
            }
        }
        elseif ($request->get('answer')) {
            $answer = $answerRepository->find($request->get('answer'));
            $sheet = $answer->getExaminationSheet();
            $start = $answer->getStart();
            $question = $answer->getQuestion();
        }
        elseif ($request->get('sheet') && $request->get('question')) {
            $question = $questionRepository->find($request->get('question'));
            $sheet = $examinationSheetRepository->find($request->get('sheet'));
        }
        else {
            throw new NotFoundHttpException('No exam id');
        }

        $answer = new Answer();
        $answer->setQuestion($question)
            ->setStart($start)
            ->setSqlText('')
            ->setExaminationSheet($sheet)
            ->setId((new IdGenerator())->generateQuestionId());
        $answerRepository->add($answer);
        return $this->redirectToRoute('app_answer_run', ['id' => $answer->getId()], Response::HTTP_SEE_OTHER);
    }

    #[Route('/{id}', name: 'app_answer_show', methods: ['GET'])]
    public function show(Answer $answer): Response
    {
        return $this->render('answer/show.html.twig', [
            'answer' => $answer,
            'nextQuestion' => $this->getNextQuestion($answer),
            'limit' => $this->getLimit($answer, new DateTime()),
        ]);
    }

    #[Route('/{id}/edit', name: 'app_answer_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Answer $answer, AnswerRepository $answerRepository): Response
    {
        $checkRight = new ExamCheckRight();

        $form = $this->createForm(AnswerType::class, $answer);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            try {
                $result = $this->studentConnection->fetchAll($answer->getSqlText());
                $answer->setResultTable($result);
                $answer->setResultError('');
            } catch (Exception $e) {
                $answer->setResultTable([]);
                $answer->setResultError($e->getMessage());
            }

            $answerRepository->add($checkRight->getCheckedAnswer($answer));
            return $this->redirectToRoute('app_answer_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('answer/edit.html.twig', [
            'answer' => $answer,
            'form' => $form,
            'limit' => $this->getLimit($answer, new DateTime()),
        ]);
    }

    #[Route('/{id}/run', name: 'app_answer_run', methods: ['GET', 'POST'])]
    public function run(
        Request $request,
        Answer $answer,
        AnswerRepository $answerRepository
    ): Response {
        $now = new DateTime();
        $checkRight = new ExamCheckRight();

        $limit = $this->getLimit($answer, $now);

        if ($limit < 0) {
            $answer->setEnd($now);
            $answerRepository->add($answer);
            $nextQuestion = $this->getNextQuestion($answer);
            return $nextQuestion

                ? $this->redirectToRoute('app_answer_new', [
                    'question' => $nextQuestion->getId(),
                    'sheet' => $answer->getExaminationSheet()->getId(),
                ], Response::HTTP_SEE_OTHER)

                : $this->redirectToRoute('app_examination_sheet_show', [
                    'id' => $answer->getExaminationSheet()->getId(),
                ], Response::HTTP_SEE_OTHER);
        }

        $form = $this->createForm(AnswerType::class, $answer);
        $form->handleRequest($request);

        if (!$answer->getEnd() && $form->isSubmitted() && $form->isValid()) {

            try {
                $result = $this->studentConnection->fetchAll($answer->getSqlText());
                $answer->setResultTable($result)
                    ->setEnd($now);
            } catch (Exception $e) {
                $answer->setResultError($e->getMessage())
                    ->setEnd($now);
            }

            $answerRepository->add($checkRight->getCheckedAnswer($answer, $now));

            return $this->redirectToRoute('app_answer_show', [
                'id' => $answer->getId()
            ], Response::HTTP_SEE_OTHER);
        }

        $tableRowLimit = PdoConnection::VIEW_LIMIT;

        return $this->renderForm('answer/run.html.twig', [
            'answer' => $answer,
            'form' => $form,
            'limit' => $limit,
            'tableRowLimit' => $tableRowLimit,
            'studentData' => $this->studentConnection->getDatabaseData($tableRowLimit),
        ]);
    }

    #[Route('/{id}', name: 'app_answer_delete', methods: ['POST'])]
    public function delete(Request $request, Answer $answer, AnswerRepository $answerRepository): Response
    {
        if ($this->isCsrfTokenValid('delete' . $answer->getId(), $request->request->get('_token'))) {
            $answerRepository->remove($answer);
        }

        return $this->redirectToRoute('app_answer_index', [], Response::HTTP_SEE_OTHER);
    }

    private function getOrderedQuestion(array $questions): array
    {
        usort($questions, function (Question $a, Question $b) {
            $result = $a->getOrd() <=> $b->getOrd();
            if (!$result) {
                return $a->getContent() <=> $b->getContent();
            }

            return $result;
        });
        return $questions;
    }

    private function getNextQuestion(Answer $answer): ?Question
    {
        $questions = $this->getOrderedQuestion($answer->getExaminationSheet()->getExam()->getQuestions()->toArray());
        $question = $answer->getQuestion();
        $questionFind = false;
        foreach ($questions as $variant) {
            if ($questionFind) {
                return $variant;
            }
            if ($question->getId() == $variant->getId()) {
                $questionFind = true;
            }
        }

        return null;
    }

    private function getLimit(Answer $answer, DateTimeInterface $now): int
    {
        $calculator = new TimeLimitCalculator($now);
        $questionLimit = $calculator->getLimit(new TimeLimitQuestion($answer));
        $examLimit = $calculator->getLimit(new TimeLimitExam($answer));
        if ($questionLimit && $examLimit) {
            return min($questionLimit, $examLimit);
        }
        return $questionLimit ?: $examLimit;
    }
}
