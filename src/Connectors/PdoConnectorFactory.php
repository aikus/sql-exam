<?php

namespace App\Connectors;

class PdoConnectorFactory
{
    public function createConnect(string $dsn, string $user, string $password): PdoConnection
    {
//        die($url);
        return new PdoConnection(new \PDO($dsn, $user, $password));
    }
}