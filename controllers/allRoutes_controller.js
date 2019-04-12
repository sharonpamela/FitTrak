let express = require("express");
let moment = require("moment");
let router = express.Router();

var connection = require("../config/connection.js");

// Import the models to use its database functions.
let users = require("../models/users.js");
let fitplans = require("../models/fitplans.js");
let fitplan_days = require("../models/fitplan_days.js");
let fitplan_day_exercises = require("../models/fitplan_day_exercises.js");
let sets = require("../models/fitplan_day_exercise_sets.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
    let hbsObject = {
        title: 'FitTraker',
        style: 'style-home.css'
    };
    res.render("home", hbsObject);

});

router.get("/login", function (req, res) {
    let hbsObject = {
        title: 'Login',
        style: 'style-login.css'
    };
    console.log(hbsObject);
    res.render("login", hbsObject);
});

router.get("/logged", function (req, res) {
    let hbsObject = {
        title: 'FitTrak',
        style: 'style-logged.css'
    };
    console.log(hbsObject);
    res.render("logged", hbsObject);

});

router.get("/train", async function (req, res) {

    let user_id = 1;
    let fitplan_id = 1;
    let hbsObject = {
        title: 'Train',
        style: 'style-train.css'
    }

    // first query:
    let table1 = "fitplans";
    let cols1 = ["fitplan_name"];
    let condition1 = "fitplan_id = " + user_id;

    const fitPlanData = await fitplans.selectColumns(table1, cols1, condition1);
    hbsObject['fitplan_name'] = fitPlanData;

    // second query: 
    let table2 = "fitplan_days";
    let cols2 = ["day_number, day_name"];
    let condition2 = "user_id=" + user_id + " AND completed=0";
    let orderBy = "fitplan_day_id";

    const fitplanDayData = await fitplan_days.selectFirstInstance(table2, cols2, condition2, orderBy);
    hbsObject['curr_day'] = fitplanDayData;

    // third query:
    let table3 = "fitplans";
    let cols3 = ["info_time, info_equipment, info_num_exer"];
    let condition3 = "fitplan_id=" + fitplan_id;

    const fitplanInfo = await fitplans.selectColumns(table3, cols3, condition3);
    hbsObject['fitplan_info'] = fitplanInfo;

    // fourth query: 
    let firstTable = "fitplan_day_exercises";
    let secondTable = "fitplan_day_exercise_sets";
    let cols4 = ["exercise_id, exercise_name, exercise_sequence, set_sequence, repetitions, set_id"];
    let joinCol = "exercise_code";
    let fitplan_day_id = hbsObject['curr_day'][0].day_number;
    let condition4 = "fitplan_day_id=" + fitplan_day_id;

    const fitplanExercisesAndSets = await fitplan_day_exercises.getExercisesAndSets(firstTable, secondTable, cols4, joinCol, condition4);

    // package the entries nicely for handlebars to just render it due to its limitations around loops and such
    let completed_exer_sets_list = [];
    let exer_sets_obj = {}; // obj to create an exercise entry
    // for each exercise there is for this day...
    for (exercise in fitplanExercisesAndSets[0].exer) {
        // store it's name and sequence number
        let exer_name = fitplanExercisesAndSets[0].exer[exercise].exercise_name;
        let exer_seq = fitplanExercisesAndSets[0].exer[exercise].exercise_sequence;
        // push that to the current obj being built
        exer_sets_obj["exer_name"] = exer_name;
        exer_sets_obj["exer_seq"] = exer_seq;

        // build a unique id
        exer_sets_obj["data-id"] = exer_seq;

        let set_list = [];
        // for each set that belongs to the current exercise
        for (set in fitplanExercisesAndSets[0].sets) {
            if (fitplanExercisesAndSets[0].sets[set].exercise_sequence === exer_seq) {
                let set_id = fitplanExercisesAndSets[0].sets[set].set_id;
                //build a list of sets
                let set_seq = fitplanExercisesAndSets[0].sets[set].set_sequence;
                let rep_num = fitplanExercisesAndSets[0].sets[set].repetitions;
                set_list.push({ "set_seq": set_seq, "rep_num": rep_num, "data_id": parseInt(((exer_seq).toString() + (set_seq).toString())), "set_id": set_id });
            }
        }
        // push entire list of sets as an obj entry
        exer_sets_obj["sets_list"] = set_list;
        console.log(set_list);
        // add the completed obj to the final list     
        completed_exer_sets_list.push(exer_sets_obj);
        exer_sets_obj = {}; // clear it before starting with the next obj
    }

    hbsObject['completed_exer_entries'] = completed_exer_sets_list;

    // render one time at the end when all the data is obtained
    console.log(hbsObject);
    res.render("train", hbsObject); //hbsObject is an obj containing one key "burger" which contains a list of objects
});

router.put("/train/fitplanStart/:id", function (req, res) {
    let condition = "user_id = " + req.params.id;
    console.log("condition", condition);
    fitplans.updateOne({
        fitplan_start_date: moment().format("YYYY-MM-DD HH:mm:ss")
    }, condition, function (result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.put("/train/fitplanDayCompleted/:id", function (req, res) {
    let condition = "fitplan_day_id = " + req.params.id;
    console.log("condition", condition);
    fitplan_days.updateOne({
        completed_date: moment().format("YYYY-MM-DD HH:mm:ss")
    }, condition, function (result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });

    fitplan_days.updateOne({
        completed: 1
    }, condition, function (result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.get("/train/empty", function (req, res) {
    res.render("trainEmpty");
});

router.delete("/train/delSets/:id", function (req, res) {
    let condition = "set_id = " + req.params.id;

    sets.deleteSet(condition, function (result) {
        if (result.affectedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.get("/discover", function (req, res) {

    let hbsObject = {
        title: 'Train',
        style: 'style-train.css'
    };
    console.log(hbsObject);
    res.render("discover", hbsObject); //hbsObject is an obj containing one key "burger" which contains a list of objects

});


router.post("/train/addSets/", function (req, res) {
    sets.insertOne(
        [
            "set_sequence", "repetitions", "completed", "user_id", "exercise_code"
        ],
        [
            req.body.set_sequence, req.body.repetitions, req.body.completed, req.body.user_id, req.body.exercise_code
        ],
        function (result) {
            // Send back the ID of the new entry
            res.json({ id: result.insertId });
        });

});

// router.post("/api/fittrakers", function (req, res) {
//     console.log(req.body);
//     fittraker.insertOne([
//         "user_name", "curr_fitplan", "curr_fitplan_start_date", "prev_fitplans", "workouts_completed", "hours_trained"
//     ], [
//             req.body.user_name, req.body.curr_fitplan, req.body.curr_fitplan_start_date, req.body.prev_fitplans, req.body.workouts_completed, req.body.hours_trained
//         ], function (result) {
//             // Send back the ID of the new burger
//             res.json({ id: result.insertId });
//         });

// });

// // change only the current fitplan info for now
// router.put("/api/fittrakers/fitplan/:id", function (req, res) {
//     let condition = "id = " + req.params.id;
//     console.log("condition", condition);
//     fittraker.updateOne({
//         devoured: req.body.curr_fitplan
//     }, condition, function (result) {
//         if (result.changedRows == 0) {
//             // If no rows were changed, then the ID must not exist, so 404
//             return res.status(404).end();
//         } else {
//             res.status(200).end();
//         }
//     });
// });

// router.delete("/api/fittrakers/fitplan/:id", function (req, res) {
//     let condition = "fitplan_id = " + req.params.id;

//     fittraker.delete(condition, function (result) {
//         if (result.affectedRows == 0) {
//             // If no rows were changed, then the ID must not exist, so 404
//             return res.status(404).end();
//         } else {
//             res.status(200).end();
//         }
//     });
// });

// Export routes for server.js to use.
module.exports = router;
