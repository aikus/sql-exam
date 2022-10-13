<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221013140208 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE course (id INT AUTO_INCREMENT NOT NULL, creator_id INT NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, time_limit INT NOT NULL, status VARCHAR(255) NOT NULL, INDEX IDX_169E6FB961220EA6 (creator_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE course_answer (id INT AUTO_INCREMENT NOT NULL, cource_sheet_id INT NOT NULL, question_id INT NOT NULL, answer LONGTEXT NOT NULL, is_right TINYINT(1) DEFAULT NULL, result LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:json)\', INDEX IDX_74E58B688C50AF38 (cource_sheet_id), INDEX IDX_74E58B681E27F6BF (question_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE course_element (id INT AUTO_INCREMENT NOT NULL, course_id INT NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, ord INT NOT NULL, type VARCHAR(255) NOT NULL, INDEX IDX_49835BD5591CC992 (course_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE course_sheet (id INT AUTO_INCREMENT NOT NULL, course_id INT NOT NULL, student_id INT NOT NULL, actual_element_id INT NOT NULL, created_at DATETIME DEFAULT NULL, updated_at DATETIME DEFAULT NULL, INDEX IDX_6E97960A591CC992 (course_id), INDEX IDX_6E97960ACB944F1A (student_id), INDEX IDX_6E97960A26277F80 (actual_element_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE course ADD CONSTRAINT FK_169E6FB961220EA6 FOREIGN KEY (creator_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE course_answer ADD CONSTRAINT FK_74E58B688C50AF38 FOREIGN KEY (cource_sheet_id) REFERENCES course_sheet (id)');
        $this->addSql('ALTER TABLE course_answer ADD CONSTRAINT FK_74E58B681E27F6BF FOREIGN KEY (question_id) REFERENCES course_element (id)');
        $this->addSql('ALTER TABLE course_element ADD CONSTRAINT FK_49835BD5591CC992 FOREIGN KEY (course_id) REFERENCES course (id)');
        $this->addSql('ALTER TABLE course_sheet ADD CONSTRAINT FK_6E97960A591CC992 FOREIGN KEY (course_id) REFERENCES course (id)');
        $this->addSql('ALTER TABLE course_sheet ADD CONSTRAINT FK_6E97960ACB944F1A FOREIGN KEY (student_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE course_sheet ADD CONSTRAINT FK_6E97960A26277F80 FOREIGN KEY (actual_element_id) REFERENCES course_element (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE course DROP FOREIGN KEY FK_169E6FB961220EA6');
        $this->addSql('ALTER TABLE course_answer DROP FOREIGN KEY FK_74E58B688C50AF38');
        $this->addSql('ALTER TABLE course_answer DROP FOREIGN KEY FK_74E58B681E27F6BF');
        $this->addSql('ALTER TABLE course_element DROP FOREIGN KEY FK_49835BD5591CC992');
        $this->addSql('ALTER TABLE course_sheet DROP FOREIGN KEY FK_6E97960A591CC992');
        $this->addSql('ALTER TABLE course_sheet DROP FOREIGN KEY FK_6E97960ACB944F1A');
        $this->addSql('ALTER TABLE course_sheet DROP FOREIGN KEY FK_6E97960A26277F80');
        $this->addSql('DROP TABLE course');
        $this->addSql('DROP TABLE course_answer');
        $this->addSql('DROP TABLE course_element');
        $this->addSql('DROP TABLE course_sheet');
    }
}
