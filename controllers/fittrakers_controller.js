let express = require("express");

let router = express.Router();

var connection = require("../config/connection.js");

// Import the model (burger.js) to use its database functions.
let fittraker = require("../models/fittrakers.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
    fittraker.selectAll(function (data) {
        let hbsObject = {
            burger: data,
            title: 'FitTraker',
            style: 'style-home.css'
        };
        console.log(hbsObject);
        res.render("home", hbsObject); //hbsObject is an obj containing one key "burger" which contains a list of objects
    });
});

router.get("/login", function (req, res) {
    fittraker.selectAll(function (data) {
        let hbsObject = {
            burger: data,
            title: 'Login',
            style: 'style-login.css'
        };
        console.log(hbsObject);
        res.render("login", hbsObject); //hbsObject is an obj containing one key "burger" which contains a list of objects
    });
});

router.get("/logged", function (req, res) {
    fittraker.selectAll(function (data) {
        let hbsObject = {
            burger: data,
            title: 'FitTrak',
            style: 'style-logged.css'
        };
        console.log(hbsObject);
        res.render("logged", hbsObject); //hbsObject is an obj containing one key "burger" which contains a list of objects
    });
});

router.get("/train", function (req, res) {
    fittraker.selectAll(function (data) {
        let hbsObject = {
            burger: data,
            title: 'Train',
            style: 'style-train.css'
        };
        console.log(hbsObject);
        res.render("train", hbsObject); //hbsObject is an obj containing one key "burger" which contains a list of objects
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
    let condition = "id = " + req.params.id;

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
