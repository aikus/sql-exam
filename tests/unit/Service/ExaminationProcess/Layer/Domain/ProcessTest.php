<?php

namespace App\Tests\unit\Service\ExaminationProcess\Layer\Domain;

use App\Entity\Course;
use App\Entity\CourseAnswer;
use App\Entity\CourseElement;
use App\Entity\CourseSheet;
use App\Entity\User;
use App\Repository\CourseAnswerRepository;
use App\Repository\CourseSheetRepository;
use App\Service\ExaminationProcess\Layer\Domain\ExaminationProcessException;
use App\Service\ExaminationProcess\Layer\Domain\Process;
use App\Service\ExaminationProcess\Layer\Persistence\ProcessSaver;
use App\Service\ExaminationProcess\Layer\Responder\ProcessState;
use Doctrine\Bundle\DoctrineBundle\Registry;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Mapping\ClassMetadata;
use Doctrine\Persistence\ManagerRegistry;
use Exception;
use PHPUnit\Framework\TestCase;

class ProcessTest extends TestCase
{
    /**
     * @dataProvider data_status
     * @param ProcessState $expected
     * @param Collection $getType
     * @return void
     * @throws Exception
     */
    public function test_start(ProcessState $expected, Collection $getType): void
    {
        $course = $this->getMockBuilder(Course::class)
            ->onlyMethods(['getType'])
            ->getMock();
        $course->expects($this->any())
            ->method('getType')
            ->willReturn($getType);

        $process = new Process($this->buildMockCreator());

        self::assertEquals($expected, $process->start($this->buildUser(), $course, new \DateTime()));
    }

    public function data_status(): iterable
    {
        $firstCourseElement = new CourseElement();
        $getType = new ArrayCollection();

        $getType->add($firstCourseElement);
        yield 'один элемент' => [
            new ProcessState(
                ProcessState::STATE_IN_PROGRESS,
                1,
                [
                    $firstCourseElement,
                ],
                $firstCourseElement
            ),
            clone $getType,
        ];

        $secondCourseElement = new CourseElement();
        $getType->add($secondCourseElement);
        yield 'два элемента' => [
            new ProcessState(
                ProcessState::STATE_IN_PROGRESS,
                2,
                [
                    $firstCourseElement,
                    $secondCourseElement,
                ],
                $firstCourseElement
            ),
            clone $getType,
        ];

        $getType->clear();
        yield 'нет элементов' => [
            new ProcessState(
                ProcessState::STATE_NOT_READY,
                0,
                [],
                null
            ),
            clone $getType,
        ];
    }

    /**
     * @dataProvider data_execution
     * @param ProcessState $expected
     * @param Collection $getType
     * @param string $sqlText
     * @param array $resultAnswer
     * @return void
     * @throws ExaminationProcessException
     */
    public function test_execution(
        ProcessState $expected,
        Collection $getType,
        string $sqlText,
        array $resultAnswer
    ): void {

        $course = $this->getMockBuilder(Course::class)
            ->onlyMethods(['getType'])
            ->getMock();
        $course->expects($this->any())
            ->method('getType')
            ->willReturn($getType);

        $sheet = new CourseSheet();
        $sheet->setActualElement($getType->first());

        $process = new Process($this->buildMockCreator($sheet, $resultAnswer));

        self::assertEquals($expected, $process->execution($this->buildUser(), $course, $sqlText, new \DateTime()));
    }

    public function data_execution(): iterable
    {
        $firstCourseElement = new CourseElement();
        $getType = new ArrayCollection();
        $sqlText = '123';
        $resultAnswer = ['123'];

        $getType->add($firstCourseElement);
        yield 'выполнение запроса' => [
            new ProcessState(
                ProcessState::STATE_IN_PROGRESS,
                1,
                [
                    $firstCourseElement,
                ],
                $firstCourseElement,
                $sqlText,
                $resultAnswer,
            ),
            $getType,
            $sqlText,
            $resultAnswer
        ];
    }

    private function buildUser(): User
    {
        return $this->getMockBuilder(User::class)
            ->getMock();
    }

    private function buildMockCreator(CourseSheet $sheet = null, array $resultAnswer = []): ProcessSaver
    {
        $sheet = $sheet ?? new CourseSheet();

        $sheetRepository = $this->getMockBuilder(CourseSheetRepository::class)
            ->disableOriginalConstructor()
            ->getMock();

        $sheetRepository->method('findOneBy')
            ->willReturn($sheet);

        $collection = $this->getMockBuilder(\Doctrine\Common\Collections\AbstractLazyCollection::class)
            ->disableOriginalConstructor()
            ->onlyMethods(['last', 'doInitialize'])
            ->getMock();

        $collection->method('last')
            ->willReturn($sheet);

        $sheetRepository->method('matching')
            ->willReturn($collection);

        return new ProcessSaver($sheetRepository, $this->buildAnswerRepository($resultAnswer));
    }

    private function buildAnswerRepository(array $resultAnswer): CourseAnswerRepository
    {
        $managerRegistry = $this->getMockBuilder(Registry::class)
            ->disableOriginalConstructor()
            ->onlyMethods(['getManagerForClass'])
            ->getMock();

        $objectManager = $this->getMockBuilder(EntityManager::class)
            ->disableOriginalConstructor()
            ->onlyMethods(['getClassMetadata'])
            ->getMock();

        $classMetadata = $this->getMockBuilder(ClassMetadata::class)
            ->disableOriginalConstructor()
            ->getMock();

        $objectManager->method('getClassMetadata')
            ->willReturn($classMetadata);

        $managerRegistry->method('getManagerForClass')
            ->willReturn($objectManager);

        return new class($managerRegistry, $resultAnswer) extends CourseAnswerRepository {
            private array $result;
            public function __construct(ManagerRegistry $registry, array $result)
            {
                $this->result = $result;
                parent::__construct($registry);
            }

            public function findOneBy(array $criteria, ?array $orderBy = null): ?CourseAnswer
            {
                return null;
            }

            public function add(CourseAnswer $entity, bool $flush = true): void
            {
                /** Весь метод ради вот этого */
                $entity->setResult($this->result);
            }
        };
    }
}