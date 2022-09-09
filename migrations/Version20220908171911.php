<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220908171911 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE test_answer (id INT AUTO_INCREMENT NOT NULL, question_id INT NOT NULL, test_sheet_id INT NOT NULL, variants LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_4D044D0B1E27F6BF (question_id), INDEX IDX_4D044D0B1E710DF3 (test_sheet_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE test_sheet (id INT AUTO_INCREMENT NOT NULL, student_id INT NOT NULL, test_id INT NOT NULL, start_time DATETIME NOT NULL, INDEX IDX_8CE237E9CB944F1A (student_id), INDEX IDX_8CE237E91E5D0459 (test_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE test_answer ADD CONSTRAINT FK_4D044D0B1E27F6BF FOREIGN KEY (question_id) REFERENCES test_question (id)');
        $this->addSql('ALTER TABLE test_answer ADD CONSTRAINT FK_4D044D0B1E710DF3 FOREIGN KEY (test_sheet_id) REFERENCES test_sheet (id)');
        $this->addSql('ALTER TABLE test_sheet ADD CONSTRAINT FK_8CE237E9CB944F1A FOREIGN KEY (student_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE test_sheet ADD CONSTRAINT FK_8CE237E91E5D0459 FOREIGN KEY (test_id) REFERENCES test (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE test_answer DROP FOREIGN KEY FK_4D044D0B1E27F6BF');
        $this->addSql('ALTER TABLE test_answer DROP FOREIGN KEY FK_4D044D0B1E710DF3');
        $this->addSql('ALTER TABLE test_sheet DROP FOREIGN KEY FK_8CE237E9CB944F1A');
        $this->addSql('ALTER TABLE test_sheet DROP FOREIGN KEY FK_8CE237E91E5D0459');
        $this->addSql('DROP TABLE test_answer');
        $this->addSql('DROP TABLE test_sheet');
    }
}
