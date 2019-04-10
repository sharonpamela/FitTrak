-- ex: insert 2 users
INSERT INTO users (user_name, user_height, user_weight, sex) VALUES ("mona", "54", 130, 'F');
INSERT INTO users (user_name, user_height, user_weight, sex) VALUES ("peter", "61", 180, 'M');

-- ex: assign a fitplan program to each user
INSERT INTO fitplans (fitplan_name, fitplan_start_date, fitplan_duration, completed, user_id) VALUES ("Tone it Up!", "2019-04-08 11:00:34", 7, 0, 1);
INSERT INTO fitplans (fitplan_name, fitplan_start_date, fitplan_duration, completed, user_id) VALUES ("Build Strength", "2019-03-06 9:20:00", 7, 0, 2);

-- ex: The program "Tone it Up!" (fitplan_id = 1) has 2 days of workouts only
INSERT INTO fitplan_days (user_id, completed, fitplan_id) VALUES (1,0,1); 
INSERT INTO fitplan_days (user_id, completed, fitplan_id) VALUES (1,0,1); 

-- ex: The program "Build Strength" (fitplan_id = 2) has 3 days of workouts only
INSERT INTO fitplan_days (user_id, completed, fitplan_id) VALUES (2,0,2); 
INSERT INTO fitplan_days (user_id, completed, fitplan_id) VALUES (2,0,2); 
INSERT INTO fitplan_days (user_id, completed, fitplan_id) VALUES (2,0,2);

-- ex: initialize the exercises for each of the days
INSERT INTO fitplan_day_exercises (exercise_name, fitplan_day_id, user_id) VALUES ("push ups",1, 1); 
INSERT INTO fitplan_day_exercises (exercise_name, fitplan_day_id, user_id) VALUES ("squats",1, 1); 

-- ex: inititalize the repetitions inside of each set for each of the exercises
-- push ups
INSERT INTO fitplan_day_exercise_sets (repetitions, completed, exercise_id , user_id) VALUES (10, 0, 1, 1); 
INSERT INTO fitplan_day_exercise_sets (repetitions, completed, exercise_id , user_id) VALUES (10, 0, 1, 1);
INSERT INTO fitplan_day_exercise_sets (repetitions, completed, exercise_id , user_id) VALUES (10, 0, 1, 1); 
-- squats
INSERT INTO fitplan_day_exercise_sets (repetitions, completed, exercise_id , user_id) VALUES (15, 0, 2, 1); 
INSERT INTO fitplan_day_exercise_sets (repetitions, completed, exercise_id , user_id) VALUES (15, 0, 2, 1); 
INSERT INTO fitplan_day_exercise_sets (repetitions, completed, exercise_id , user_id) VALUES (15, 0, 2, 1); 
INSERT INTO fitplan_day_exercise_sets (repetitions, completed, exercise_id , user_id) VALUES (15, 0, 2, 1); 


SELECT * FROM users;
SELECT * FROM fitplans;
SELECT * FROM fitplan_days;
SELECT * FROM fitplan_day_exercises;
SELECT * FROM fitplan_day_exercise_sets;