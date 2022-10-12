<?php

namespace App\Tests\Service\ExaminationProcess;

use App\Entity\Course;
use App\Entity\CourseElement;
use App\Entity\CourseSheet;
use App\Entity\User;
use App\Service\ExaminationProcess\CourseExaminationProcess;
use App\Service\ExaminationProcess\EntityCreator;
use Doctrine\Common\Collections\ArrayCollection;
use Exception;
use PHPUnit\Framework\TestCase;

class CourseExaminationProcessTest extends TestCase
{
    /** @throws Exception */
    public function test_start(): void
    {
        // Arrange
        $now = new \DateTime();

        $element = $this->getMockBuilder(CourseElement::class)
            ->getMock();

        $course = $this->getMockBuilder(Course::class)
            ->disableOriginalConstructor()
            ->getMock();

        $sheet = $this->getMockBuilder(CourseSheet::class)
            ->disableOriginalConstructor()
            ->getMock();

        $course->expects($this->once())
            ->method('getType')
            ->willReturn(new ArrayCollection([$element]));

        $creator = $this->getMockBuilder(EntityCreator::class)
            ->disableOriginalConstructor()
            ->getMock();

        $creator->expects($this->once())
            ->method('createSheet')
            ->willReturn($sheet);

        // Assert
        $process = new CourseExaminationProcess($creator);

        // Act
        self::assertEquals([
            'sheet' => $sheet->getId(),
            'element' => $element->getId(),
        ], $process->start(new User(), $course, $now));;
    }
}