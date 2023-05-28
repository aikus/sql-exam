<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230430174240 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE course_element_poll_option (id INT AUTO_INCREMENT NOT NULL, course_element_id INT DEFAULT NULL, text VARCHAR(255) NOT NULL, is_right TINYINT(1) NOT NULL, create_time DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, update_time DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE course_element_poll_option ADD CONSTRAINT FK_8BDEED7C0FD64A7 FOREIGN KEY (course_element_id) REFERENCES course_element (id)');
//        $this->addSql('CREATE INDEX IDX_8BDEED7C0FD64A7 ON course_element_poll_option (course_element_id)');

        $this->addSql('CREATE TABLE course_element_setting (id INT AUTO_INCREMENT NOT NULL, course_element_id INT DEFAULT NULL, property VARCHAR(255) NOT NULL, value VARCHAR(255) NOT NULL, create_time DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, update_time DATETIME NOT NULL, INDEX IDX_49D4C09EC0FD64A7 (course_element_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE course_element_setting ADD CONSTRAINT FK_49D4C09EC0FD64A7 FOREIGN KEY (course_element_id) REFERENCES course_element (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE course_element_poll_option DROP FOREIGN KEY FK_8BDEED7C0FD64A7');
        $this->addSql('DROP INDEX IDX_8BDEED7C0FD64A7 ON course_element_poll_option');
        $this->addSql('DROP TABLE course_element_poll_option');
        $this->addSql('ALTER TABLE course_element_setting DROP FOREIGN KEY FK_49D4C09EC0FD64A7');
        $this->addSql('DROP TABLE course_element_setting');
    }
}
