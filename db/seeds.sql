
-- ex: insert 2 users
INSERT INTO users (user_name, user_height, user_weight, sex) VALUES ("Mona", "54", 130, 'F');
INSERT INTO users (user_name, user_height, user_weight, sex) VALUES ("Peter", "61", 180, 'M');

-- ex: assign a fitplan program to each user
INSERT INTO fitplans (fitplan_name, fitplan_start_date, fitplan_duration, completed, info_time, info_equipment, info_num_exer, user_id) VALUES ("Tone it Up!", "2019-04-08 11:00:34", 7, 0,  30, "No", 2, 1);
INSERT INTO fitplans (fitplan_name, fitplan_start_date, fitplan_duration, completed, info_time, info_equipment, info_num_exer, user_id) VALUES ("Build Strength", "2019-03-06 9:20:00", 7, 0, 45, "No", 3, 2);

-- ex: The program "Tone it Up!" (fitplan_id = 1) has 2 days of workouts only
INSERT INTO fitplan_days (day_number, day_name, completed, completed_date, user_id, fitplan_id) VALUES (1, "Body Weight Slay", 0, NULL, 1, 1); 
INSERT INTO fitplan_days (day_number, day_name, completed, completed_date, user_id, fitplan_id) VALUES (2, "Cardio Boost", 0, NULL, 1, 1); 
-- ex: The program "Build Strength" (fitplan_id = 2) has 3 days of workouts only
INSERT INTO fitplan_days (day_number, day_name, completed, completed_date, user_id, fitplan_id) VALUES (1, "Baby Got Back", 0, NULL, 2, 2); 
INSERT INTO fitplan_days (day_number, day_name, completed, completed_date, user_id, fitplan_id) VALUES (1, "Arms", 0, NULL, 2, 2); 
INSERT INTO fitplan_days (day_number, day_name, completed, completed_date, user_id, fitplan_id) VALUES (1, "Legs", 0, NULL, 2, 2);

-- Ex: INSERT INTO fitplan_day_exercises (exercise_name, user_id, fitplan_day_id) VALUES ("push ups",1, 1) 

-- ex: initialize the exercises for each of the days
INSERT INTO fitplan_day_exercises (exercise_sequence, exercise_code, exercise_name, user_id, fitplan_day_id) VALUES (1, 100, "push ups",1, 1); 
INSERT INTO fitplan_day_exercises (exercise_sequence, exercise_code, exercise_name, user_id, fitplan_day_id) VALUES (2, 200, "squats",1, 1); 
INSERT INTO fitplan_day_exercises (exercise_sequence, exercise_code, exercise_name, user_id, fitplan_day_id) VALUES (1, 300, "Run",1, 2); 
INSERT INTO fitplan_day_exercises (exercise_sequence, exercise_code, exercise_name, user_id, fitplan_day_id) VALUES (2, 400, "Stair Master",1, 2); 

-- ex: inititalize the repetitions inside of each set for each of the exercises
-- day 1: push ups
INSERT INTO fitplan_day_exercise_sets (set_sequence, repetitions, completed, user_id, exercise_code) VALUES (1, 10, 0, 1, 100); 
INSERT INTO fitplan_day_exercise_sets (set_sequence, repetitions, completed, user_id, exercise_code) VALUES (2, 10, 0, 1, 100);
INSERT INTO fitplan_day_exercise_sets (set_sequence, repetitions, completed, user_id, exercise_code) VALUES (3, 10, 0, 1, 100); 
-- day 1: squats
INSERT INTO fitplan_day_exercise_sets (set_sequence, repetitions, completed, user_id, exercise_code) VALUES (1, 15, 0, 1, 200); 
INSERT INTO fitplan_day_exercise_sets (set_sequence, repetitions, completed, user_id, exercise_code) VALUES (2, 15, 0, 1, 200); 
INSERT INTO fitplan_day_exercise_sets (set_sequence, repetitions, completed, user_id, exercise_code) VALUES (3, 15, 0, 1, 200); 
INSERT INTO fitplan_day_exercise_sets (set_sequence, repetitions, completed, user_id, exercise_code) VALUES (4, 15, 0, 1, 200); 
-- day 2: Run
INSERT INTO fitplan_day_exercise_sets (set_sequence, repetitions, completed, user_id, exercise_code) VALUES (1, 0, 0, 1, 300);
-- day 2: Stair Master
INSERT INTO fitplan_day_exercise_sets (set_sequence, repetitions, completed, user_id, exercise_code) VALUES (2, 400, 0, 1, 400);


SELECT * FROM users;
SELECT * FROM fitplans;
SELECT * FROM fitplan_days;
SELECT * FROM fitplan_day_exercises;
SELECT * FROM fitplan_day_exercise_sets;

-- display all the data in a single table
select * from users a
    left join fitplans b on b.user_id = a.user_id 
    left join fitplan_days c on c.fitplan_id = b.fitplan_id 
    left join fitplan_day_exercises d on d.fitplan_day_id = c.fitplan_day_id
    left join fitplan_day_exercise_sets e on e.exercise_code = d.exercise_code;
    