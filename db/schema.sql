DROP DATABASE IF EXISTS fittrakers_db;
CREATE DATABASE fittrakers_db;
USE fittrakers_db;

-- Ex: INSERT INTO users_db (user_name, user_height, user_weight, sex) VALUES ("mona", "54", 130, 'F')
CREATE TABLE users (
	user_id int NOT NULL AUTO_INCREMENT,
	user_name VARCHAR(255) NOT NULL,
    user_height VARCHAR(255) NOT NULL,
    user_weight INT default 0,
    sex VARCHAR(255) default "na",
    PRIMARY KEY (user_id)
) ENGINE=InnoDB;

-- Ex:  INSERT INTO fitplans (fitplan_name, fitplan_start_date, fitplan_duration, completed, user_id) 
--      VALUES ("Weight Lifting 101", "2019-04-08 11:00:34", 7, false, 1) 
CREATE TABLE fitplans (
    fitplan_id int NOT NULL AUTO_INCREMENT,
    fitplan_name varchar(255) NOT NULL,
    fitplan_start_date TIMESTAMP DEFAULT NULL,
    fitplan_duration INT DEFAULT 7,
    completed BOOLEAN DEFAULT 0,
	info_time int NOT NULL,
    info_equipment varchar(255) NOT NULL,
    info_num_exer int NOT NULL,
    user_id int NOT NULL,
    PRIMARY KEY (fitplan_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
) ENGINE=InnoDB;

-- Ex: INSERT INTO fitplan_days (day_number, day_name, completed, completed_date, user_id, fitplan_id ) VALUES (1,"Body Weight Slay",false, "2019-04-2 11:00:00", 1,1) 
CREATE TABLE fitplan_days (
    fitplan_day_id int NOT NULL AUTO_INCREMENT,
    day_number int NOT NULL,
    day_name varchar(255) NOT NULL,
    completed BOOLEAN DEFAULT 0,
    completed_date TIMESTAMP DEFAULT NULL,
	user_id int NOT NULL,
    fitplan_id int NOT NULL,
    PRIMARY KEY (fitplan_day_id),
    FOREIGN KEY (fitplan_id) REFERENCES fitplans (fitplan_id)
) ENGINE=InnoDB;

-- Ex: INSERT INTO fitplan_day_exercises (exercise_number, exercise_name, user_id, fitplan_day_id) VALUES ("push ups",1, 1) 
CREATE TABLE fitplan_day_exercises (
    exercise_id int NOT NULL AUTO_INCREMENT,
    exercise_sequence int NOT NULL,
    exercise_code int NOT NULL UNIQUE,
    exercise_name varchar(255) NULL,
    user_id int NOT NULL, 
    fitplan_day_id int NOT NULL,
    PRIMARY KEY (exercise_id),
    FOREIGN KEY (fitplan_day_id) REFERENCES fitplan_days (fitplan_day_id)
) ENGINE=InnoDB;

-- Ex: INSERT INTO fitplan_day_exercise_sets (set_number, repetitions, completed, user_id, exercise_id) VALUES (1, 10, 0, 1, 1) 
CREATE TABLE fitplan_day_exercise_sets (
    set_id int NOT NULL AUTO_INCREMENT,
    set_sequence int NOT NULL,
    repetitions int NOT NULL,
    completed BOOLEAN DEFAULT 0,
    user_id int NOT NULL,
    exercise_code int NOT NULL,
    PRIMARY KEY (set_id),
    FOREIGN KEY (exercise_code) REFERENCES fitplan_day_exercises (exercise_code)
) ENGINE=InnoDB;
    