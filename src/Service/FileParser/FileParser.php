<?php

namespace App\Service\FileParser;

use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Serializer\Encoder\CsvEncoder;
use Symfony\Component\Serializer\Serializer;
use function mb_convert_encoding;

class FileParser
{
    private LoggerInterface $logger;

    private CellHandler $cellHandler;

    public function __construct()
    {
        $this->logger = new FileParserLogger();
        $this->cellHandler = new CellHandler(new CollectorFactory($this->logger));
    }

    public function run(UploadedFile $file): void
    {
        $fileContent = mb_convert_encoding($file->getContent(), "utf-8", "Windows-1251");
        $serializer = new Serializer([], [new CsvEncoder()]);
        $data = $serializer->decode($fileContent, 'csv', [
            'csv_delimiter' => ',',
            'csv_key_separator' => '|',
            'no_headers' => true,
        ]);

        echo '<body style="background-color: #333">';
        $this->parseTable($data);
        $this->logger->debug('EntityContainer', $this->cellHandler->getEntityContainer());
        echo '</body>';
    }

    private function parseTable(array $table): void
    {
        foreach ($table as $rowNum => $row) {
            $this->parseRow($rowNum, $row, $table);
        }
    }

    private function parseRow(int $rowNum, array $row, array $table): void
    {
        foreach ($row as $colNum => $colValue) {
            $this->parseCol($rowNum, $colNum, $colValue, $table);
        }
    }

    private function parseCol(int $rowNum, int $colNum, string $colValue, array $table): void
    {
        if ($rowNum >= 6) return;
        if ($colNum >= 15) return;

        try {
            $this->cellHandler->process($rowNum, $colNum, $colValue, $table);
        } catch (\Exception $e) {
            $this->logger->error($e->getLine().'<br>'.$e->getMessage().'<br>'.$e->getTraceAsString());
        }
    }
}
