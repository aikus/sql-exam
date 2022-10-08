<?php

namespace App\Controller;

use App\Connectors\IdGenerator;
use App\Entity\Answer;
use App\Entity\Exam;
use App\Entity\ExaminationSheet;
use App\Entity\Question;
use App\Repository\AnswerRepository;
use App\Repository\ExaminationSheetRepository;
use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

#[Route('/api-process')]
class ProcessController extends AbstractController
{

    #[Route('/{id}/start', name: 'app_exam_start', methods: ['GET'])]
    public function start(Exam $exam,
                          Security $security,
                          IdGenerator $idGenerator,
                          ExaminationSheetRepository $examinationSheetRepository,
                          AnswerRepository $answerRepository
    )
    {
        $user = $security->getUser();
        $examSheet = new ExaminationSheet();
        $examSheet->setId($idGenerator->generateExaminationSheetId());
        $examSheet->setStudent($user);
        $examSheet->setExam($exam);
        $examinationSheetRepository->add($examSheet);
        $iterator = $exam->getQuestions()->getIterator();
        $iterator->uasort(function(Question $a, Question $b) {
            return $a->getOrd() <=> $b->getOrd();
        });
        $question = (new ArrayCollection(iterator_to_array($iterator)))->first();
        $now = new DateTime();
        $answer = new Answer();
        $answer->setStart($now);
        $answer->setEnd($now);
        $answer->setId($idGenerator->generateAnswerId());
        $answer->setQuestion($question);
        $answer->setExaminationSheet($examSheet);
        $answerRepository->add($answer);
        return new JsonResponse([
            'examinationSheet' => $examSheet->getId(),
            'answer' => $answer->getId()
        ]);
    }
}