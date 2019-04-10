DROP DATABASE IF EXISTS fittrakers_db;
CREATE DATABASE fittrakers_db;
USE fittrakers_db;

-- Ex: INSERT INTO users_db (user_name, user_height, user_weight, sex) VALUES ("mona", " 5',4'' ", 130, 'F')
CREATE TABLE users (
	user_id int NOT NULL AUTO_INCREMENT,
	user_name VARCHAR(255) NOT NULL,
    user_height INT default 0,
    user_weight INT default 0,
    sex VARCHAR(255) default "na",
    PRIMARY KEY (user_id)
) ENGINE=InnoDB;

-- Ex:  INSERT INTO fitplans (fitplan_name, fitplan_start_date, fitplan_duration, completed, user_id) 
--      VALUES ("Weight Lifting 101", "2019-04-08 11:00:34", 7, false, 1) 
CREATE TABLE fitplans (
    fitplan_id int NOT NULL AUTO_INCREMENT,
    fitplan_name varchar(255) NULL,
    fitplan_start_date TIMESTAMP NULL,
    fitplan_duration INT DEFAULT 7,
    completed BOOLEAN DEFAULT 0,
    user_id int NOT NULL,
    PRIMARY KEY (fitplan_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
) ENGINE=InnoDB;

-- Ex: INSERT INTO fitplan_day (fitplan_day_id, completed, user_id) VALUES (1,false,1) 
CREATE TABLE fitplan_day (
    fitplan_day_id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    completed BOOLEAN DEFAULT 0,
    PRIMARY KEY (fitplan_day_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
) ENGINE=InnoDB;

-- Ex: INSERT INTO fitplan_day_sets (amount, user_id) VALUES (0,1) 
CREATE TABLE fitplan_day_sets (
    fitplan_day_set_id int NOT NULL AUTO_INCREMENT,
    amount int NOT NULL,
    user_id int NOT NULL,
    PRIMARY KEY (fitplan_day_set_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
) ENGINE=InnoDB;

