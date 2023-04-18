<?php

namespace App\Controller\VisitorFeedback;

use App\Entity\VisitorFeedback\Screenshot;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

#[AsController]
final class ScreenshotAction extends AbstractController
{
    public function __invoke(Request $request): Screenshot
    {
        $uploadedFile = $request->files->get('file');
        if (!$uploadedFile) {
            throw new BadRequestHttpException('"file" is required');
        }

        $screenshot = new Screenshot();
        $screenshot->setSourceUrl($uploadedFile);

        return $screenshot;
    }
}