<?php

namespace App\Connectors\AnswerHandler;

use App\Entity\CourseAnswer;
use Exception;

class Poll implements Handler
{
    public function handle(CourseAnswer $answer)
    {
        try {
            $IsRight = false;
            $studentAnswerIds = json_decode($answer->getAnswer(),true) ?? [];
            $rightAnswerIds = $this->rightAnswerIds($answer);

            if (count($studentAnswerIds) === count($rightAnswerIds)) {
                $result = array_diff($rightAnswerIds, $studentAnswerIds);
                $IsRight = count($result) === 0;
            }
            $answer->setIsRight($IsRight);
        }
        catch (Exception $exception) {
            $answer->setResult([
                'error' => $exception->getMessage(),
                'trace' => $exception->getTrace()
            ]);
            $answer->setIsRight(false);
        }
    }

    private function rightAnswerIds(CourseAnswer $answer): array
    {
        $result = [];
        foreach ($answer->getQuestion()->getPollOptions() as $pollOption) {
            if ($pollOption->isIsRight()) {
                $result[] = $pollOption->getId();
            }
        }
        return $result;
    }
}