CREATE TABLE skill (`id` INT AUTO_INCREMENT NOT NULL,
    `category_id` INT DEFAULT NULL,
    `alias` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` LONGTEXT NOT NULL,
    `check_type` VARCHAR(255) NOT NULL,
    `create_time` DATETIME NOT NULL,
    `update_time` DATETIME NOT NULL,
    INDEX IDX_5E3DE47712469DE2 (`category_id`),
    PRIMARY KEY(`id`)
);

CREATE TABLE skill_category (`id` INT AUTO_INCREMENT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` LONGTEXT DEFAULT NULL,
    `create_time` DATETIME NOT NULL,
    `update_time` DATETIME NOT NULL,
    PRIMARY KEY(`id`)
);

CREATE TABLE skill_quarter (`id` INT AUTO_INCREMENT NOT NULL,
    `alias` VARCHAR(255) NOT NULL,
    `create_time` DATETIME NOT NULL,
    `update_time` DATETIME NOT NULL,
    PRIMARY KEY(`id`)
);

CREATE TABLE skill_summary (`id` INT AUTO_INCREMENT NOT NULL,
    `quarter_id` INT DEFAULT NULL,
    `user_id` INT DEFAULT NULL,
    `skill_id` INT DEFAULT NULL,
    `skill_value_id` INT DEFAULT NULL,
    `team_id` INT DEFAULT NULL,
    `create_time` DATETIME NOT NULL,
    `update_time` DATETIME NOT NULL,
    INDEX IDX_D4DDF84ABED4A2B2 (`quarter_id`),
    INDEX IDX_D4DDF84AA76ED395 (`user_id`),
    INDEX IDX_D4DDF84A5585C142 (`skill_id`),
    INDEX IDX_D4DDF84ABB88D650 (`skill_value_id`),
    INDEX IDX_D4DDF84A296CD8AE (`team_id`),
    PRIMARY KEY(`id`)
);

CREATE TABLE skill_value (`id` INT AUTO_INCREMENT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` LONGTEXT DEFAULT NULL, value VARCHAR(255) NOT NULL,
    `create_time` DATETIME NOT NULL,
    `update_time` DATETIME NOT NULL,
    PRIMARY KEY(`id`)
);

CREATE TABLE team (`id` INT AUTO_INCREMENT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` LONGTEXT NOT NULL,
    `create_time` DATETIME NOT NULL,
    `update_time` DATETIME NOT NULL,
    PRIMARY KEY(`id`)
);

ALTER TABLE skill ADD CONSTRAINT FK_5E3DE47712469DE2 FOREIGN KEY (`category_id`) REFERENCES skill_category (`id`);
ALTER TABLE skill_summary ADD CONSTRAINT FK_D4DDF84ABED4A2B2 FOREIGN KEY (`quarter_id`) REFERENCES skill_quarter (`id`);
ALTER TABLE skill_summary ADD CONSTRAINT FK_D4DDF84A5585C142 FOREIGN KEY (`skill_id`) REFERENCES skill (`id`);
ALTER TABLE skill_summary ADD CONSTRAINT FK_D4DDF84ABB88D650 FOREIGN KEY (`skill_value_id`) REFERENCES skill_value (`id`);
ALTER TABLE skill_summary ADD CONSTRAINT FK_D4DDF84A296CD8AE FOREIGN KEY (`team_id`) REFERENCES team (`id`);
