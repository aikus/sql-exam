<?php

namespace App\Connectors;

use PDO;

class PdoConnectorFactory
{
    public function createConnect(string $dsn, string $user, string $password): PdoConnection
    {
        return new PdoConnection(new PDO($dsn, $user, $password));
    }
}