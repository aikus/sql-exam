<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220408022706 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE answer (id INT AUTO_INCREMENT NOT NULL, question_id VARCHAR(255) NOT NULL, examination_sheet_id INT NOT NULL, sql_text LONGTEXT NOT NULL, result_table LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:object)\', result_error LONGTEXT DEFAULT NULL, start DATETIME DEFAULT NULL, end DATETIME DEFAULT NULL, INDEX IDX_DADD4A251E27F6BF (question_id), INDEX IDX_DADD4A25C93C7CDC (examination_sheet_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE examination_sheet (id INT AUTO_INCREMENT NOT NULL, student_id INT DEFAULT NULL, exam_id VARCHAR(255) NOT NULL, INDEX IDX_9A8A6A27CB944F1A (student_id), INDEX IDX_9A8A6A27578D5E91 (exam_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE answer ADD CONSTRAINT FK_DADD4A251E27F6BF FOREIGN KEY (question_id) REFERENCES question (id)');
        $this->addSql('ALTER TABLE answer ADD CONSTRAINT FK_DADD4A25C93C7CDC FOREIGN KEY (examination_sheet_id) REFERENCES examination_sheet (id)');
        $this->addSql('ALTER TABLE examination_sheet ADD CONSTRAINT FK_9A8A6A27CB944F1A FOREIGN KEY (student_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE examination_sheet ADD CONSTRAINT FK_9A8A6A27578D5E91 FOREIGN KEY (exam_id) REFERENCES exam (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE answer DROP FOREIGN KEY FK_DADD4A25C93C7CDC');
        $this->addSql('DROP TABLE answer');
        $this->addSql('DROP TABLE examination_sheet');
        $this->addSql('ALTER TABLE exam CHANGE id id VARCHAR(255) NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE description description LONGTEXT NOT NULL COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE question CHANGE id id VARCHAR(255) NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE exam_id exam_id VARCHAR(255) NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE content content LONGTEXT NOT NULL COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE `user` CHANGE email email VARCHAR(180) NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE roles roles LONGTEXT NOT NULL COLLATE `utf8mb4_unicode_ci` COMMENT \'(DC2Type:json)\', CHANGE password password VARCHAR(255) NOT NULL COLLATE `utf8mb4_unicode_ci`');
    }
}
