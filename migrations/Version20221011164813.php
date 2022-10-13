<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221011164813 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE course_element DROP FOREIGN KEY FK_49835BD539FC5E10');
        $this->addSql('DROP INDEX IDX_49835BD539FC5E10 ON course_element');
        $this->addSql('ALTER TABLE course_element CHANGE cource_id course_id INT NOT NULL');
        $this->addSql('ALTER TABLE course_element ADD CONSTRAINT FK_49835BD5591CC992 FOREIGN KEY (course_id) REFERENCES course (id)');
        $this->addSql('CREATE INDEX IDX_49835BD5591CC992 ON course_element (course_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE course_element DROP FOREIGN KEY FK_49835BD5591CC992');
        $this->addSql('DROP INDEX IDX_49835BD5591CC992 ON course_element');
        $this->addSql('ALTER TABLE course_element CHANGE course_id cource_id INT NOT NULL');
        $this->addSql('ALTER TABLE course_element ADD CONSTRAINT FK_49835BD539FC5E10 FOREIGN KEY (cource_id) REFERENCES course (id)');
        $this->addSql('CREATE INDEX IDX_49835BD539FC5E10 ON course_element (cource_id)');
    }
}
