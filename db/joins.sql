select * from fitplan_days where user_id=1 and completed=0 order by fitplan_day_id limit 1;

select * from users left join fitplans on fitplans.user_id = users.user_id left join fitplan_days on fitplan_days.fitplan_id = fitplans.fitplan_id where users.user_id=1;

select * from users left join fitplans on fitplans.user_id = users.user_id left join fitplan_days on fitplan_days.fitplan_id = fitplans.fitplan_id left join fitplan_day_exercises exer on exer.fitplan_day_id = fitplan_days.fitplan_day_id where users.user_id=1;

select * from users left join fitplans on fitplans.user_id = users.user_id left join fitplan_days on fitplan_days.fitplan_id = fitplans.fitplan_id left join fitplan_day_exercises exer on exer.fitplan_day_id = fitplan_days.fitplan_day_id where users.user_id=1;

select * from users a
    left join fitplans b on b.user_id = a.user_id 
    left join fitplan_days c on c.fitplan_id = b.fitplan_id 
    left join fitplan_day_exercises d on d.fitplan_day_id = c.fitplan_day_id 
    left join fitplan_day_exercise_sets e on e.exercise_id = d.exercise_id
    where a.user_id=1;
