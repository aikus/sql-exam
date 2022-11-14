<?php

namespace App\Service\ExaminationProcess\Layer\Responder;

use App\Entity\Course;
use App\Entity\CourseAnswer;
use App\Entity\CourseElement;
use App\Entity\CourseSheet;
use Doctrine\Common\Util\ClassUtils;

class ProcessState extends Responder
{
    public const STATE_NOT_READY = 'not_ready';
    public const STATE_READY = 'ready';
    public const STATE_IN_PROGRESS = 'in_progress';
    public const STATE_COMPLETED = 'completed';
    public const STATE_CLOSED = 'closed';
    public const STATE_REMOVED = 'removed';

    public function __construct(
        readonly string $state,
        readonly int $elementCount,
        readonly array $elements,
        readonly ?CourseElement $currentElement,
        readonly ?string $sqlRequest = null,
        readonly ?array $sqlResponse = null
    ) {
    }

    public function response(): array
    {
        return $this->normalize([
            'state' => $this->state ?? self::STATE_READY,
            'elementCount' => $this->elementCount,
            'elements' => $this->elements,
            'currentElement' => $this->currentElement,
            'sqlRequest' => $this->sqlRequest,
            'sqlResponse' => $this->sqlResponse,
        ]);
    }

    public function normalize(array $data): array
    {
        $classAlias = [
            Course::class => 'courses',
            CourseAnswer::class => 'course_answers',
            CourseElement::class => 'course_elements',
            CourseSheet::class => 'course_sheets',
        ];

        foreach ($data as $key => $datum) {

            if (is_array($datum)) {
                $datum = $this->normalize($datum);
            }
            elseif (is_object($datum)) {
                $className = ClassUtils::getClass($datum);
                if (isset($classAlias[$className])) {
                    $datum = '/api-platform/'.$classAlias[$className].'/'.$datum->getId();
                }
            }

            $result[$key] = $datum;
        }

        return $result ?? $data;
    }
}