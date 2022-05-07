<?php

namespace App\Service\StudentResultTable;

use App\Entity\Exam;
use App\Entity\Question;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Exception;

class StudentResultTable
{
    public const DEFAULT_EMPTY_VALUE = 0;

    public function responder(Exam $exam): Responder
    {
        try {
            $questions = $this->getSortedCollection($exam->getQuestions(), 'getOrd');
        } catch (Exception $e) {
            $questions = $exam->getQuestions();
        }
        $sheets = $exam->getExaminationSheets();

        $result[0] = ['FIO'];

        /** @var Question $question */
        foreach ($questions as $question) {
            $result[0][] = $question->getOrd();
        }
        $result[0][] = 'Sum';

        foreach ($sheets as $key => $sheet) {
            $result['results'][$key][] = $sheet;
            $countRight = 0;
            foreach ($questions as $question) {
                $answers = $sheet->getAnswersByQuestion($question);
                $checkRight = 0;
                foreach ($answers->toArray() as $answer) {
                    if (!$checkRight) {
                        $checkRight = $answer->getCheckRight();
                        $answerId = $answer->getId();
                    }
                }
                $countRight += $checkRight ? 1 : 0;
                $result['results'][$key][] = $checkRight ? ($answerId ?? 0) : self::DEFAULT_EMPTY_VALUE;
            }
            $result['results'][$key][] = $countRight;
        }

        return new Responder($result);
    }

    /**
     * @throws Exception
     */
    private function getSortedCollection(Collection $collection, string $valueGetter): Collection
    {
        $iterator = $collection->getIterator();
        $iterator->uasort(function ($a, $b) use ($valueGetter) {
            return ($a->{$valueGetter}() > $b->{$valueGetter}()) ? 1 : -1;
        });

        return new ArrayCollection(iterator_to_array($iterator));
    }
}