<?php

namespace App\Connectors\VisitorFeedback;

use App\Entity\VisitorFeedback\Message;
use Doctrine\Persistence\Event\LifecycleEventArgs;
use Symfony\Component\Security\Core\Security;

class MessageListener
{
    public function __construct(private readonly Security $security)
    {
    }

    public function prePersist(Message $message, LifecycleEventArgs $event): void
    {
        $message->setCreator($this->security->getUser());
    }
}
