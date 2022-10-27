<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221024111244 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE course_element ADD COLUMN `answer` TEXT DEFAULT NULL AFTER `description`');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE course_element DROP COLUMN `answer`');
    }
}
