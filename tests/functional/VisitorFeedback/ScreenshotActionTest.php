<?php

namespace App\Tests\functional\VisitorFeedback;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use App\Entity\VisitorFeedback\Screenshot;
use Hautelook\AliceBundle\PhpUnit\RefreshDatabaseTrait;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\DecodingExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;

class ScreenshotActionTest extends ApiTestCase
{
    public const TITLE = 'My file uploaded';

    use RefreshDatabaseTrait;

    /**
     * @throws TransportExceptionInterface
     * @throws ServerExceptionInterface
     * @throws RedirectionExceptionInterface
     * @throws DecodingExceptionInterface
     * @throws ClientExceptionInterface
     */
    public function testCreateAScreenshot(): void
    {
        $file = new UploadedFile('tests/fixtures/files/image.png', 'image.png');
        $client = self::createClient();

        $client->request('POST', '/api-platform/screenshots', [
            'headers' => ['Content-Type' => 'multipart/form-data'],
            'extra' => [
                'parameters' => [
                    'title' => self::TITLE,
                ],
                'files' => [
                    'file' => $file,
                ],
            ]
        ]);
        $this->assertResponseIsSuccessful();
        $this->assertMatchesResourceItemJsonSchema(Screenshot::class);
        $this->assertJsonContains(['title' => self::TITLE]);
    }
}