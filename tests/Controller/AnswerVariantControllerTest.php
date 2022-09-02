<?php

namespace App\Test\Controller;

use App\Entity\AnswerVariant;
use App\Repository\AnswerVariantRepository;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class AnswerVariantControllerTest extends WebTestCase
{
    private KernelBrowser $client;
    private AnswerVariantRepository $repository;
    private string $path = '/answer/variant/';

    protected function setUp(): void
    {
        $this->client = static::createClient();
        $this->repository = (static::getContainer()->get('doctrine'))->getRepository(AnswerVariant::class);

        foreach ($this->repository->findAll() as $object) {
            $this->repository->remove($object, true);
        }
    }

    public function testIndex(): void
    {
        $crawler = $this->client->request('GET', $this->path);

        self::assertResponseStatusCodeSame(200);
        self::assertPageTitleContains('AnswerVariant index');

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
            'answer_variant[contnent]' => 'Testing',
            'answer_variant[isRight]' => 'Testing',
            'answer_variant[question]' => 'Testing',
        ]);

        self::assertResponseRedirects('/answer/variant/');

        self::assertSame($originalNumObjectsInRepository + 1, count($this->repository->findAll()));
    }

    public function testShow(): void
    {
        $this->markTestIncomplete();
        $fixture = new AnswerVariant();
        $fixture->setContnent('My Title');
        $fixture->setIsRight('My Title');
        $fixture->setQuestion('My Title');

        $this->repository->add($fixture, true);

        $this->client->request('GET', sprintf('%s%s', $this->path, $fixture->getId()));

        self::assertResponseStatusCodeSame(200);
        self::assertPageTitleContains('AnswerVariant');

        // Use assertions to check that the properties are properly displayed.
    }

    public function testEdit(): void
    {
        $this->markTestIncomplete();
        $fixture = new AnswerVariant();
        $fixture->setContnent('My Title');
        $fixture->setIsRight('My Title');
        $fixture->setQuestion('My Title');

        $this->repository->add($fixture, true);

        $this->client->request('GET', sprintf('%s%s/edit', $this->path, $fixture->getId()));

        $this->client->submitForm('Update', [
            'answer_variant[contnent]' => 'Something New',
            'answer_variant[isRight]' => 'Something New',
            'answer_variant[question]' => 'Something New',
        ]);

        self::assertResponseRedirects('/answer/variant/');

        $fixture = $this->repository->findAll();

        self::assertSame('Something New', $fixture[0]->getContnent());
        self::assertSame('Something New', $fixture[0]->getIsRight());
        self::assertSame('Something New', $fixture[0]->getQuestion());
    }

    public function testRemove(): void
    {
        $this->markTestIncomplete();

        $originalNumObjectsInRepository = count($this->repository->findAll());

        $fixture = new AnswerVariant();
        $fixture->setContnent('My Title');
        $fixture->setIsRight('My Title');
        $fixture->setQuestion('My Title');

        $this->repository->add($fixture, true);

        self::assertSame($originalNumObjectsInRepository + 1, count($this->repository->findAll()));

        $this->client->request('GET', sprintf('%s%s', $this->path, $fixture->getId()));
        $this->client->submitForm('Delete');

        self::assertSame($originalNumObjectsInRepository, count($this->repository->findAll()));
        self::assertResponseRedirects('/answer/variant/');
    }
}
