<?php

namespace App\Controller\Teacher;

use App\Connectors\PdoConnection;
use App\Entity\Exam;
use App\Repository\AnswerRepository;
use App\Repository\ExamRepository;
use App\Service\CheckRight\CheckRight;
use App\Service\StudentResultTable\StudentResultTable;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/check/answer')]
class CheckAnswerController extends AbstractController
{
    public function __construct(
        private readonly PdoConnection $studentConnection
    ) {
    }

    #[Route('/', name: 'app_check_answer_index')]
    public function index(ExamRepository $repository): Response
    {
        return $this->render('teacher/check_answer/index.html.twig', [
            'exams' => $repository->findAll(),
        ]);
    }

    #[Route('/{exam}', name: 'app_check_answer_show')]
    public function show(Exam $exam): Response
    {
        return $this->render('teacher/check_answer/show.html.twig', [
            'sheets' => $exam->getExaminationSheets(),
        ]);
    }

    #[Route('/run/{exam}', name: 'app_check_answer_run')]
    public function run(
        Exam $exam,
        AnswerRepository $answerRepository,
        CheckRight $checkRight
    ): Response {

        foreach ($exam->getExaminationSheets() as $sheet) {

            $questions = $sheet->getExam()->getQuestions();

            foreach ($questions as $question) {

                $rightAnswer = $question->getRightAnswers()->first() ?: null;
                $answers = $sheet->getAnswersByQuestion($question);

                foreach ($answers as $answer) {
                    if (
                        null !== $rightAnswer
                        && null !== $answer
                    ) {
                        try {
                            $result = $this->studentConnection->fetchAll($answer->getSqlText());
                            $answer->setResultTable($result);
                            $answer->setResultError('');
                        } catch (Exception $e) {
                            $answer->setResultTable([]);
                            $answer->setResultError($e->getMessage());
                        }

                        $answerRepository->add($checkRight->getCheckedAnswer($answer));
                    }
                }
            }
        }

        return $this->redirectToRoute('app_check_answer_results', [
            'exam' => $exam->getId(),
        ], Response::HTTP_SEE_OTHER);
    }

    #[Route('/results/{exam}', name: 'app_check_answer_results')]
    public function results(Exam $exam, StudentResultTable $resultTable): Response
    {
        $responder = $resultTable->responder($exam);

        return $this->render('teacher/check_answer/results.html.twig', [
            'head' => $responder->getTableHead(),
            'results' => $responder->getResults(),
        ]);
    }

    #[Route('/resend', name: 'app_check_answer_resend')]
    public function resend(
        ExamRepository $examRepository,
        AnswerRepository $answerRepository,
        CheckRight $checkRight
    ): Response {
        $idAnswers = [
            'fff9b7ae-2a05-41c5-baf4-72aa6dd7daa1',
            'ff509af7-9da2-446d-8074-5e44bd224ef4',
            'fb8a5aca-8b95-4643-88c3-44e7121ea459',
            'fa5415ba-493d-459c-a551-b895f09eda48',
            'f935deac-1a5b-4b88-a932-c75056861de1',
            'f7717bc4-5cbe-4efa-8c92-e22cebb853f1',
            'f5568919-1f80-440c-87bc-1334a311c907',
            'efb23859-d900-4960-b9ff-ab338cab0d04',
            'eca78675-6d57-4687-bd30-bea7bd574e30',
            'ea828fcb-1b8c-4bac-b64f-38ae645a4136',
            'e8d46699-63ee-4ab6-b7a6-e2c6342e5d04',
            'e7f44905-79f2-4a32-8a3b-ceab056010ce',
            'e368c0eb-2f77-4f27-907a-c95b985e5fcd',
            'e2a3e113-e53a-417e-bb56-256f7fbe83cc',
            'db0dd2e2-729d-4fb8-8e23-f31f65795f9f',
            'cd002292-c724-49e2-8aa2-176dde84a572',
            'cc0ff452-f448-4cc9-b40c-0649a0e802a2',
            'ca2e266a-4337-4ed4-9c09-c72b1fb7d439',
            'c9ac7b06-bd28-45fa-b4d7-abed1ed17242',
            'c8a4ce87-7e9c-4591-8859-5eac3486aec9',
            'c39660d2-81d5-4ad8-be12-a745f4ded550',
            'bf6a25af-32b7-4cf4-aacd-19a0a88d359b',
            'be7c531c-bb9a-4ff0-b1b3-19b891e4c2cb',
            'b39d3c66-8843-4436-aaea-c086fdd1ca5e',
            'b057ddc2-9d0d-423f-b2e4-52a9433eb940',
            'b04f0cf2-4237-435b-8ade-7e1876bc6746',
            'ab69f25a-74de-44db-8534-1ad384ddfbe7',
            'a515cd09-d4b7-493b-80d1-b67a126a6baf',
            'a4696748-d95b-498b-ae05-21ebc171f414',
            'a2ff46c3-8229-4d3b-b61f-07cdb473df07',
            'a0b06c73-724f-4008-891e-42781442d097',
            '82589852-8c18-484a-9ec2-aef3deafefa4',
            '73735348-c6a1-4039-9510-8b549081b1d4',
            '53723438-a1d0-45e7-944d-4268e2f49e11',
            '40525558-2990-41c6-838b-e4f7275228df',
            '29520119-f2d5-415a-ab64-637e2e683e71',
            '7641592f-f8a9-49c0-88d4-fbc5790e80cf',
            '826651c2-dcda-430f-b110-efd8c56729ad',
            '303470cb-f34a-48db-b2c9-48b218362e2c',
            '51912b42-d250-4137-b8e0-a3347d4023f3',
            '9906a0d7-f5d7-438a-8420-598cd8db50e5',
            '8354bbe0-6adf-4ffd-a341-9d1ce45a6edc',
            '8242fa87-93b2-4005-8069-b96a9ad067c6',
            '4792a915-f732-46a1-bf14-25db3787cea3',
            '4619da7c-2404-494d-b205-41cb4dc834ee',
            '02569f46-88c6-4720-b4f5-2c624ed95483',
            '950db767-d6af-4f13-bf40-cddf55f41fd3',
            '733a2918-d808-49e7-8a1f-4a7fe53821da',
            '502be49d-b912-41b9-9e5d-2da7b09ce347',
            '162c8e8c-f302-4601-97a5-78855e9d2c49',
            '115b7bc3-5e5d-4253-a952-b7e81b09c5f6',
            '93a72884-e7f4-42f7-9ed6-f78201802060',
            '91a4060b-2d0a-4d46-82ce-34a12243e17f',
            '086e23db-3756-4432-a1e8-676c24d2de05',
            '78baa443-175c-4d01-a543-b920c5998828',
            '70ed7276-22ed-4c66-bd16-f93271c89b9b',
            '51e11476-8582-4807-b8a4-78bc08cee7a0',
            '49c6c8ec-45b8-45a9-836f-5253bbc9bec2',
            '42ef596e-d3a1-45e5-8c27-a88fedc4282f',
            '38a1f880-af53-429e-8998-248a7872aaab',
            '34bf4122-0961-4659-ba90-c616ebafa4aa',
            '25b1f974-4139-445e-acc6-73679e829a16',
            '24d9b681-aa96-482c-9a84-4e24dbd59fe9',
            '23abb0fa-24c2-4506-9e93-e6726e03958d',
            '21e193a7-dafc-4a6f-9208-dfdff65fe46e',
            '8ce5e92a-933c-4977-a193-e3c93b3f1c8d',
            '8b19ac2f-8f3c-4529-8735-d0d5a3a06962',
            '8a07d821-996d-4619-9f16-f7b203ccae00',
            '7db40da7-c29b-4def-86db-b1a4c9cb51e9',
            '6f4c2e95-1086-4744-b99b-450802cebcf2',
            '6a6096c4-78e1-4667-b1ca-70d2ab38cd62',
            '5d96f91e-2aaa-4006-934b-8e1114c18841',
            '5d3e910b-920c-496f-a019-f82fa6b8fc18',
            '2eaf364f-c536-4fe9-a0b4-661cb03c1b97',
            '1fa8ec16-7fc4-4f6c-b762-aa8784f384ec',
            '1f7feff2-8ca3-4437-90d2-be9bde738abd',
        ];

        foreach ($idAnswers as $answerId) {
            $answer = $answerRepository->find($answerId);

            try {
                $result = $this->studentConnection->fetchAll($answer->getSqlText());
                $answer->setResultTable($result);
                $answer->setResultError('');
            } catch (Exception $e) {
                $answer->setResultTable([]);
                $answer->setResultError($e->getMessage());
            }

            $answerRepository->add(
                $checkRight->getCheckedAnswer($answer)
            );
        }

        return $this->redirectToRoute('app_check_answer_results', [
            'exam' => $examRepository->findAll()[1]->getId(),
        ], Response::HTTP_SEE_OTHER);
    }
}