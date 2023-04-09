<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230402083354 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE visitor_feedback_message (id INT AUTO_INCREMENT NOT NULL, creator_id INT DEFAULT NULL, message LONGTEXT NOT NULL, fio VARCHAR(255) NOT NULL, contact VARCHAR(255) NOT NULL, create_time DATETIME NOT NULL, INDEX IDX_16D3C9161220EA6 (creator_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE visitor_feedback_screenshot (id INT AUTO_INCREMENT NOT NULL, visitor_feedback_message_id INT DEFAULT NULL, source_url VARCHAR(255) NOT NULL, create_time DATETIME NOT NULL, INDEX IDX_D1837E84DA6073EC (visitor_feedback_message_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE visitor_feedback_message ADD CONSTRAINT FK_16D3C9161220EA6 FOREIGN KEY (creator_id) REFERENCES `user` (id) ON DELETE SET NULL');
        $this->addSql('ALTER TABLE visitor_feedback_screenshot ADD CONSTRAINT FK_D1837E84DA6073EC FOREIGN KEY (visitor_feedback_message_id) REFERENCES visitor_feedback_message (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE visitor_feedback_message DROP FOREIGN KEY FK_16D3C9161220EA6');
        $this->addSql('ALTER TABLE visitor_feedback_screenshot DROP FOREIGN KEY FK_D1837E84DA6073EC');
        $this->addSql('DROP TABLE visitor_feedback_message');
        $this->addSql('DROP TABLE visitor_feedback_screenshot');
    }
}
