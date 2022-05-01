<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220428054235 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE answer ADD check_right LONGTEXT DEFAULT NULL');
        $this->addSql('ALTER TABLE exam ADD status VARCHAR(255) DEFAULT NULL');

    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE exam DROP status');
        $this->addSql('ALTER TABLE answer DROP check_right, CHANGE id id VARCHAR(255) NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE question_id question_id VARCHAR(255) NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE examination_sheet_id examination_sheet_id VARCHAR(255) NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE sql_text sql_text LONGTEXT NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE result_table result_table LONGTEXT DEFAULT NULL COLLATE `utf8mb4_unicode_ci` COMMENT \'(DC2Type:object)\', CHANGE result_error result_error LONGTEXT DEFAULT NULL COLLATE `utf8mb4_unicode_ci`');
    }
}
