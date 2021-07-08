create schema tonyProject;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123password';
use tonyProject;

CREATE TABLE `character` (
  `characterId` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `class` VARCHAR(45) NOT NULL,
  `level` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`characterId`));

INSERT INTO `character` (`name`, `class`, `level`) VALUES 
('Tony', 'Barbarian', 4),
('Alex', 'Wizard', 6),
('Meghan', 'Sorcerer', 17),
('Michelle', 'Bard', 19);