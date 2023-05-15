<?php

namespace App\Connectors;

use App\Entity\CourseElementSetting;
use Doctrine\ORM\Event\LifecycleEventArgs;

class CourseElementSettingListener
{
    public function prePersist(CourseElementSetting $pollOption, LifecycleEventArgs $event): void
    {
        $pollOption->setUpdateTime(new \DateTime());
        $pollOption->setCreateTime(new \DateTime());
    }
}