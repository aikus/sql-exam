<?php

namespace App\Service;

use App\Connectors\PdoConnection;
use App\Service\CheckRight\Domain\CheckRight;
use App\Connectors\AnswerHandler\Sql;
use PDO;

class DBConfigure
{
    private array $config = [
        'mysql' => [
            'label' => 'mysql база',
            'dsn' => 'mysql:host=database;dbname=ubrr_analit_demo',
            'user' => 'student',
            'password' => 'student-password',
        ],
        'postgre' => [
            'label' => 'postgre база',
            'dsn' => 'pgsql:host=pgdb;dbname=postgres',
            'user' => 'postgres',
            'password' => 'example',
        ]
    ];

    public function getLabels(): array
    {
        $result = [];
        foreach ($this->config as $key => $value) {
            $result[$key] = $value['label'];
        }
        return $result;
    }

    public function getHandler(string $key, CheckRight $checkRight) {
        $data = $this->config[$key];
        return new Sql(new PdoConnection(new PDO($data['dsn'], $data['user'], $data['password'])), $checkRight);
    }
}