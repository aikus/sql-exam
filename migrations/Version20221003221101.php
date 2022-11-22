<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221003221101 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE skill (id INT AUTO_INCREMENT NOT NULL, category_id INT DEFAULT NULL, alias VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, check_type VARCHAR(255) NOT NULL, create_time DATETIME NOT NULL, update_time DATETIME NOT NULL, INDEX IDX_5E3DE47712469DE2 (category_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE skill_category (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, create_time DATETIME NOT NULL, update_time DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE skill_quarter (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, team_id INT DEFAULT NULL, alias VARCHAR(255) NOT NULL, reviewer VARCHAR(255) DEFAULT NULL, status VARCHAR(255) NOT NULL, create_time DATETIME NOT NULL, update_time DATETIME NOT NULL, INDEX IDX_6747F2EA76ED395 (user_id), INDEX IDX_6747F2E296CD8AE (team_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE skill_summary (id INT AUTO_INCREMENT NOT NULL, skill_id INT DEFAULT NULL, skill_value_id INT DEFAULT NULL, create_time DATETIME NOT NULL, update_time DATETIME NOT NULL, INDEX IDX_D4DDF84A5585C142 (skill_id), INDEX IDX_D4DDF84ABB88D650 (skill_value_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE skill_summary ADD quarter_id INT DEFAULT NULL');
        $this->addSql('CREATE TABLE skill_value (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, value VARCHAR(255) NOT NULL, create_time DATETIME NOT NULL, update_time DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE team (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, create_time DATETIME NOT NULL, update_time DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE skill ADD CONSTRAINT FK_5E3DE47712469DE2 FOREIGN KEY (category_id) REFERENCES skill_category (id)');
        $this->addSql('ALTER TABLE skill_quarter ADD CONSTRAINT FK_6747F2EA76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE skill_quarter ADD CONSTRAINT FK_6747F2E296CD8AE FOREIGN KEY (team_id) REFERENCES team (id)');
        $this->addSql('ALTER TABLE skill_summary ADD CONSTRAINT FK_D4DDF84A5585C142 FOREIGN KEY (skill_id) REFERENCES skill (id)');
        $this->addSql('ALTER TABLE skill_summary ADD CONSTRAINT FK_D4DDF84ABB88D650 FOREIGN KEY (skill_value_id) REFERENCES skill_value (id)');
        $this->addSql('ALTER TABLE skill_summary ADD CONSTRAINT FK_D4DDF84ABED4A2B2 FOREIGN KEY (quarter_id) REFERENCES skill_quarter (id)');
        $this->addSql('CREATE INDEX IDX_D4DDF84ABED4A2B2 ON skill_summary (quarter_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE skill DROP FOREIGN KEY FK_5E3DE47712469DE2');
        $this->addSql('ALTER TABLE skill_quarter DROP FOREIGN KEY FK_6747F2EA76ED395');
        $this->addSql('ALTER TABLE skill_quarter DROP FOREIGN KEY FK_6747F2E296CD8AE');
        $this->addSql('ALTER TABLE skill_summary DROP FOREIGN KEY FK_D4DDF84A5585C142');
        $this->addSql('ALTER TABLE skill_summary DROP FOREIGN KEY FK_D4DDF84ABB88D650');
        $this->addSql('ALTER TABLE skill_summary DROP FOREIGN KEY FK_D4DDF84ABED4A2B2');
        $this->addSql('DROP INDEX IDX_D4DDF84ABED4A2B2 ON skill_summary');
        $this->addSql('ALTER TABLE skill_summary DROP quarter_id');
        $this->addSql('DROP TABLE skill');
        $this->addSql('DROP TABLE skill_category');
        $this->addSql('DROP TABLE skill_quarter');
        $this->addSql('DROP TABLE skill_summary');
        $this->addSql('DROP TABLE skill_value');
        $this->addSql('DROP TABLE team');
    }
}
