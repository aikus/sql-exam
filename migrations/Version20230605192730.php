<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230605192730 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE course_answer DROP FOREIGN KEY FK_74E58B681E27F6BF');
        $this->addSql('ALTER TABLE course_answer DROP FOREIGN KEY FK_74E58B688C50AF38');
        $this->addSql('ALTER TABLE course_answer ADD CONSTRAINT FK_74E58B681E27F6BF FOREIGN KEY (question_id) REFERENCES course_element (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE course_answer ADD CONSTRAINT FK_74E58B688C50AF38 FOREIGN KEY (cource_sheet_id) REFERENCES course_sheet (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE course_element DROP FOREIGN KEY FK_49835BD5591CC992');
        $this->addSql('ALTER TABLE course_element CHANGE answer_execution_result answer_execution_result LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:json)\'');
        $this->addSql('ALTER TABLE course_element ADD CONSTRAINT FK_49835BD5591CC992 FOREIGN KEY (course_id) REFERENCES course (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE course_element_poll_option DROP FOREIGN KEY FK_8BDEED7C0FD64A7');
        $this->addSql('ALTER TABLE course_element_poll_option CHANGE course_element_id course_element_id INT NOT NULL');
        $this->addSql('ALTER TABLE course_element_poll_option ADD CONSTRAINT FK_8BDEED7C0FD64A7 FOREIGN KEY (course_element_id) REFERENCES course_element (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE course_element_setting DROP FOREIGN KEY FK_49D4C09EC0FD64A7');
        $this->addSql('ALTER TABLE course_element_setting CHANGE course_element_id course_element_id INT NOT NULL');
        $this->addSql('ALTER TABLE course_element_setting ADD CONSTRAINT FK_49D4C09EC0FD64A7 FOREIGN KEY (course_element_id) REFERENCES course_element (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE course_sheet DROP FOREIGN KEY FK_6E97960A26277F80');
        $this->addSql('ALTER TABLE course_sheet ADD CONSTRAINT FK_6E97960A26277F80 FOREIGN KEY (actual_element_id) REFERENCES course_element (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE course_element_poll_option DROP FOREIGN KEY FK_8BDEED7C0FD64A7');
        $this->addSql('ALTER TABLE course_element_poll_option CHANGE course_element_id course_element_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE course_element_poll_option ADD CONSTRAINT FK_8BDEED7C0FD64A7 FOREIGN KEY (course_element_id) REFERENCES course_element (id)');
        $this->addSql('ALTER TABLE course_element DROP FOREIGN KEY FK_49835BD5591CC992');
        $this->addSql('ALTER TABLE course_element CHANGE answer_execution_result answer_execution_result LONGTEXT DEFAULT \'[]\' COMMENT \'(DC2Type:json)\'');
        $this->addSql('ALTER TABLE course_element ADD CONSTRAINT FK_49835BD5591CC992 FOREIGN KEY (course_id) REFERENCES course (id)');
        $this->addSql('ALTER TABLE course_answer DROP FOREIGN KEY FK_74E58B688C50AF38');
        $this->addSql('ALTER TABLE course_answer DROP FOREIGN KEY FK_74E58B681E27F6BF');
        $this->addSql('ALTER TABLE course_answer ADD CONSTRAINT FK_74E58B688C50AF38 FOREIGN KEY (cource_sheet_id) REFERENCES course_sheet (id)');
        $this->addSql('ALTER TABLE course_answer ADD CONSTRAINT FK_74E58B681E27F6BF FOREIGN KEY (question_id) REFERENCES course_element (id)');
        $this->addSql('ALTER TABLE course_sheet DROP FOREIGN KEY FK_6E97960A26277F80');
        $this->addSql('ALTER TABLE course_sheet ADD CONSTRAINT FK_6E97960A26277F80 FOREIGN KEY (actual_element_id) REFERENCES course_element (id)');
        $this->addSql('ALTER TABLE course_element_setting DROP FOREIGN KEY FK_49D4C09EC0FD64A7');
        $this->addSql('ALTER TABLE course_element_setting CHANGE course_element_id course_element_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE course_element_setting ADD CONSTRAINT FK_49D4C09EC0FD64A7 FOREIGN KEY (course_element_id) REFERENCES course_element (id)');
    }
}
