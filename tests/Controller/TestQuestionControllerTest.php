<?php

namespace App\Test\Controller;

use App\Entity\TestQuestion;
use App\Repository\TestQuestionRepository;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class TestQuestionControllerTest extends WebTestCase
{
    private KernelBrowser $client;
    private TestQuestionRepository $repository;
    private string $path = '/test/question/';

    protected function setUp(): void
    {
        $this->client = static::createClient();
        $this->repository = (static::getContainer()->get('doctrine'))->getRepository(TestQuestion::class);

        foreach ($this->repository->findAll() as $object) {
            $this->repository->remove($object, true);
        }
    }

    public function testIndex(): void
    {
        $crawler = $this->client->request('GET', $this->path);

        self::assertResponseStatusCodeSame(200);
        self::assertPageTitleContains('TestQuestion index');

        // Use the $crawler to perform additional assertions e.g.
        // self::assertSame('Some text on the page', $crawler->filter('.p')->first());
    }

    public function testNew(): void
    {
        $originalNumObjectsInRepository = count($this->repository->findAll());

        $this->markTestIncomplete();
        $this->client->request('GET', sprintf('%snew', $this->path));

        self::assertResponseStatusCodeSame(200);

        $this->client->submitForm('Save', [
            'test_question[question]' => 'Testing',
            'test_question[rightVariantQty]' => 'Testing',
            'test_question[questionOrder]' => 'Testing',
            'test_question[test]' => 'Testing',
        ]);

        self::assertResponseRedirects('/test/question/');

        self::assertSame($originalNumObjectsInRepository + 1, count($this->repository->findAll()));
    }

    public function testShow(): void
    {
        $this->markTestIncomplete();
        $fixture = new TestQuestion();
        $fixture->setQuestion('My Title');
        $fixture->setRightVariantQty('My Title');
        $fixture->setQuestionOrder('My Title');
        $fixture->setTest('My Title');

        $this->repository->add($fixture, true);

        $this->client->request('GET', sprintf('%s%s', $this->path, $fixture->getId()));

        self::assertResponseStatusCodeSame(200);
        self::assertPageTitleContains('TestQuestion');

        // Use assertions to check that the properties are properly displayed.
    }

    public function testEdit(): void
    {
        $this->markTestIncomplete();
        $fixture = new TestQuestion();
        $fixture->setQuestion('My Title');
        $fixture->setRightVariantQty('My Title');
        $fixture->setQuestionOrder('My Title');
        $fixture->setTest('My Title');

        $this->repository->add($fixture, true);

        $this->client->request('GET', sprintf('%s%s/edit', $this->path, $fixture->getId()));

        $this->client->submitForm('Update', [
            'test_question[question]' => 'Something New',
            'test_question[rightVariantQty]' => 'Something New',
            'test_question[questionOrder]' => 'Something New',
            'test_question[test]' => 'Something New',
        ]);

        self::assertResponseRedirects('/test/question/');

        $fixture = $this->repository->findAll();

        self::assertSame('Something New', $fixture[0]->getQuestion());
        self::assertSame('Something New', $fixture[0]->getRightVariantQty());
        self::assertSame('Something New', $fixture[0]->getQuestionOrder());
        self::assertSame('Something New', $fixture[0]->getTest());
    }

    public function testRemove(): void
    {
        $this->markTestIncomplete();

        $originalNumObjectsInRepository = count($this->repository->findAll());

        $fixture = new TestQuestion();
        $fixture->setQuestion('My Title');
        $fixture->setRightVariantQty('My Title');
        $fixture->setQuestionOrder('My Title');
        $fixture->setTest('My Title');

        $this->repository->add($fixture, true);

        self::assertSame($originalNumObjectsInRepository + 1, count($this->repository->findAll()));

        $this->client->request('GET', sprintf('%s%s', $this->path, $fixture->getId()));
        $this->client->submitForm('Delete');

        self::assertSame($originalNumObjectsInRepository, count($this->repository->findAll()));
        self::assertResponseRedirects('/test/question/');
    }
}
