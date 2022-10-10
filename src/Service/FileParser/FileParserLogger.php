<?php

namespace App\Service\FileParser;

use Psr\Log\AbstractLogger;

class FileParserLogger extends AbstractLogger
{
    public function notice($message, array $context = []): void
    {
        echo $message;
    }

    public function log($level, $message, array $context = []): void
    {
        echo '<pre style="background-color: #ffffff30; margin-bottom: 1rem;">';
        echo '<div>';
        print_r($message);
        echo '<div>';
        foreach ($context as $key => $value) {
            echo "<div>$key: " . print_r($value, true) . '</div>';
        }
        echo '</pre>';
    }
}