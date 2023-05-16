<?php

namespace App\Controller\Api;

use App\Entity\VisitorFeedback\Message;
use App\Entity\VisitorFeedback\Screenshot;
use App\Repository\VisitorFeedback\MessageRepository;
use App\Repository\VisitorFeedback\ScreenshotRepository;
use PHPUnit\Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\AbstractObjectNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\String\Slugger\SluggerInterface;

#[Route('/api/visitor-feedback')]
final class VisitorFeedbackController extends AbstractController
{
    public function __construct(
        private readonly SluggerInterface $slugger
    ) {
    }

    #[Route('/screenshot', name: 'app_api_visitor_feedback_screenshot_upload', methods: ['POST'])]
    public function screenshotUpload(Request $request, ScreenshotRepository $repository): Response
    {
        $uploadedFileList = [];
        foreach ($request->files as $file) {

            $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $safeFilename = $this->slugger->slug($originalFilename);
            $fileName = $safeFilename.'-'.uniqid().'.'.$file->guessExtension();

            try {
                $now = new \DateTime();

                $targetDirectory = $this->getTargetDirectory($now);

                $uploadedFile = $targetDirectory . DIRECTORY_SEPARATOR . $fileName;

                $file->move($targetDirectory, $fileName);

                $screenshot = new Screenshot();
                $screenshot->setSourceUrl($uploadedFile);
                $screenshot->setCreateTime(new \DateTime());

                $repository->save($screenshot, true);
                $uploadedFileList[] = $uploadedFile;
            }
            catch (FileException $e) {
                return new JsonResponse([
                    'errors' => [
                        'exception' => [
                            'class' => get_class($e),
                            'message' => $e->getMessage(),
                        ]
                    ],
                ], Response::HTTP_BAD_REQUEST);
            }

        }

        return new JsonResponse($uploadedFileList);
    }

    private function getTargetDirectory(\DateTimeInterface $now): string
    {
        return implode(DIRECTORY_SEPARATOR, [
            $this->getParameter('upload_directory'),
            $now->format('Y'),
            $now->format('m')
        ]);
    }
}