
INSERT INTO users (user_name, user_height, user_weight, sex) VALUES ("mona", "54", 130, 'F');
INSERT INTO users (user_name, user_height, user_weight) VALUES ("peter", "61", 180, 'M');

INSERT INTO fitplans (fitplan_name, fitplan_start_date, fitplan_duration, completed, user_id) VALUES ("Weight Lifting 101", "2019-04-08 11:00:34", 7, false, 1);
INSERT INTO fitplans (fitplan_name, fitplan_start_date, fitplan_duration, completed, user_id) VALUES ("Flexibility and Mobility", "2019-03-06 9:20:00", 7, false, 2);


SELECT * FROM users;
SELECT * FROM fitplans;