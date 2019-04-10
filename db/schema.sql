DROP DATABASE IF EXISTS fittrakers_db;
CREATE DATABASE fittrakers_db;
USE fittrakers_db;

-- Ex: INSERT INTO users_db (user_name, user_height, user_weight, sex) VALUES ("mona", " 5',4'' ", 130, 'F')
CREATE TABLE users (
	user_id int NOT NULL AUTO_INCREMENT,
	user_name VARCHAR(255) NOT NULL,
    user_height INT DEFAULT 0,
    user_weight INT DEFAULT 0,
    sex VARCHAR(255) DEFAULT "na",
    hasFitplan BOOLEAN DEFAULT 0,
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
    info_time varchar(255) NOT NULL,
    info_equipment varchar(255) NOT NULL,
    info_rest varchar(255) NOT NULL,
    user_id int NOT NULL,
    PRIMARY KEY (fitplan_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
) ENGINE=InnoDB;

-- Ex: INSERT INTO fitplan_days (user_id, completed, fitplan_id ) VALUES (1,false, 1) 
CREATE TABLE fitplan_days (
    fitplan_day_id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    completed BOOLEAN DEFAULT 0,
    fitplan_id int NOT NULL,
    PRIMARY KEY (fitplan_day_id),
    FOREIGN KEY (fitplan_id) REFERENCES fitplans (fitplan_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
) ENGINE=InnoDB;

-- Ex: INSERT INTO fitplan_day_exercises (exercise_name, fitplan_day_id, user_id) VALUES ("push ups",1, 1) 
CREATE TABLE fitplan_day_exercises (
    exercise_id int NOT NULL AUTO_INCREMENT,
    exercise_name varchar(255) NULL,
    fitplan_day_id int NOT NULL,
    user_id int NOT NULL,
    PRIMARY KEY (exercise_id),
    FOREIGN KEY (fitplan_day_id) REFERENCES fitplan_days (fitplan_day_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
) ENGINE=InnoDB;

-- Ex: INSERT INTO fitplan_day_exercise_sets (amount, completed, exercise_id , user_id) VALUES (10, 0, 1, 1) 
CREATE TABLE fitplan_day_exercise_sets (
    set_id int NOT NULL AUTO_INCREMENT,
    repetitions int NOT NULL,
    completed BOOLEAN DEFAULT 0,
    exercise_id int NOT NULL,
    user_id int NOT NULL,
    PRIMARY KEY (set_id),
    FOREIGN KEY (exercise_id) REFERENCES fitplan_day_exercises (exercise_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
) ENGINE=InnoDB;

