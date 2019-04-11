let express = require("express");

let router = express.Router();

var connection = require("../config/connection.js");

// Import the models to use its database functions.
let users = require("../models/users.js");
let fitplans = require("../models/fitplans.js");
let fitplan_days = require("../models/fitplan_days.js");
let fitplan_day_exercises = require("../models/fitplan_day_exercises.js");
let fitplan_day_exercise_sets = require("../models/fitplan_day_exercise_sets.js");

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
    let table1 = "fitplans";
    let table2 = "fitplan_days";
    let condition1 = "fitplan_id = " + user_id;
    let condition2 = "user_id=" + user_id + " AND completed=0";
    let cols1 = ["fitplan_name"];
    let cols2 = ["day_number, day_name"];
    let orderBy = "fitplan_day_id";

    let hbsObject = {
        title: 'Train',
        style: 'style-train.css'
        }

    fitplans.selectColumns(table1, cols1, condition1, async function (data) {
        hbsObject['fitplan_name'] = data;
        console.log(hbsObject);
    });

    fitplan_days.selectFirstInstance (table2, cols2, condition2, orderBy, async function (data) {
        hbsObject['curr_day'] = data;
        console.log(hbsObject);
    })

    // render one time at the end when all the data is obtained
    console.log(hbsObject);
    res.render("train", hbsObject); //hbsObject is an obj containing one key "burger" which contains a list of objects

});

router.get("/train/empty", function (req, res) {
    fittraker.selectAll(function (data) {
        let hbsObject = {
            burger: data,
            title: 'Train',
            style: 'style-train.css'
        };
        console.log(hbsObject);
        res.render("trainEmpty", hbsObject); //hbsObject is an obj containing one key "burger" which contains a list of objects
    });
});

router.get("/discover", function (req, res) {
    fittraker.selectAll(function (data) {
        let hbsObject = {
            burger: data,
            title: 'Train',
            style: 'style-train.css'
        };
        console.log(hbsObject);
        res.render("discover", hbsObject); //hbsObject is an obj containing one key "burger" which contains a list of objects
    });
});

router.post("/api/fittrakers", function (req, res) {
    console.log(req.body);
    fittraker.insertOne([
        "user_name", "curr_fitplan", "curr_fitplan_start_date", "prev_fitplans", "workouts_completed", "hours_trained"
    ], [
            req.body.user_name, req.body.curr_fitplan, req.body.curr_fitplan_start_date, req.body.prev_fitplans, req.body.workouts_completed, req.body.hours_trained
        ], function (result) {
            // Send back the ID of the new burger
            res.json({ id: result.insertId });
        });

});

// change only the current fitplan info for now
router.put("/api/fittrakers/fitplan/:id", function (req, res) {
    let condition = "id = " + req.params.id;
    console.log("condition", condition);
    fittraker.updateOne({
        devoured: req.body.curr_fitplan
    }, condition, function (result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.delete("/api/fittrakers/fitplan/:id", function (req, res) {
    let condition = "fitplan_id = " + req.params.id;

    fittraker.delete(condition, function (result) {
        if (result.affectedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// Export routes for server.js to use.
module.exports = router;
