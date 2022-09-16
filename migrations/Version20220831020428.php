<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220831020428 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE answer_variant (id INT AUTO_INCREMENT NOT NULL, question_id INT NOT NULL, contnent VARCHAR(255) NOT NULL, is_right TINYINT(1) NOT NULL, INDEX IDX_B90370DC1E27F6BF (question_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE examination_sheet_question (examination_sheet_id VARCHAR(255) NOT NULL, question_id VARCHAR(255) NOT NULL, INDEX IDX_AF17DFAEC93C7CDC (examination_sheet_id), INDEX IDX_AF17DFAE1E27F6BF (question_id), PRIMARY KEY(examination_sheet_id, question_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE test (id INT AUTO_INCREMENT NOT NULL, author_id INT NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, INDEX IDX_D87F7E0CF675F31B (author_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE test_question (id INT AUTO_INCREMENT NOT NULL, test_id INT NOT NULL, question VARCHAR(255) NOT NULL, right_variant_qty INT NOT NULL, question_order INT NOT NULL, INDEX IDX_239442181E5D0459 (test_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE answer_variant ADD CONSTRAINT FK_B90370DC1E27F6BF FOREIGN KEY (question_id) REFERENCES test_question (id)');
        $this->addSql('ALTER TABLE examination_sheet_question ADD CONSTRAINT FK_AF17DFAEC93C7CDC FOREIGN KEY (examination_sheet_id) REFERENCES examination_sheet (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE examination_sheet_question ADD CONSTRAINT FK_AF17DFAE1E27F6BF FOREIGN KEY (question_id) REFERENCES question (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE test ADD CONSTRAINT FK_D87F7E0CF675F31B FOREIGN KEY (author_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE test_question ADD CONSTRAINT FK_239442181E5D0459 FOREIGN KEY (test_id) REFERENCES test (id)');
        $this->addSql('ALTER TABLE exam CHANGE status status VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE answer_variant DROP FOREIGN KEY FK_B90370DC1E27F6BF');
        $this->addSql('ALTER TABLE examination_sheet_question DROP FOREIGN KEY FK_AF17DFAEC93C7CDC');
        $this->addSql('ALTER TABLE examination_sheet_question DROP FOREIGN KEY FK_AF17DFAE1E27F6BF');
        $this->addSql('ALTER TABLE test DROP FOREIGN KEY FK_D87F7E0CF675F31B');
        $this->addSql('ALTER TABLE test_question DROP FOREIGN KEY FK_239442181E5D0459');
        $this->addSql('DROP TABLE answer_variant');
        $this->addSql('DROP TABLE examination_sheet_question');
        $this->addSql('DROP TABLE test');
        $this->addSql('DROP TABLE test_question');
        $this->addSql('ALTER TABLE exam CHANGE status status VARCHAR(255) DEFAULT \'enable\'');
    }
}
