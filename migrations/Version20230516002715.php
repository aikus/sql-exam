<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230516002715 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE course_element ADD meta_type VARCHAR(255) AFTER `type`');

    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE course_element DROP meta_type');
    }
}
