// Import the ORM to create functions that will interact with the database.
let orm = require("../config/orm.js");

let fitplan_day_exercise_set = {
  selectAll: function(cb) {
    orm.selectAll("fitplan_day_exercise_sets", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  insertOne: function(cols, vals, cb) {
    orm.insertOne("fitplan_day_exercise_sets", cols, vals, function(res) {
      cb(res);
    });
  },
  updateOne: function(objColVals, condition, cb) {
    orm.updateOne("fitplan_day_exercise_sets", objColVals, condition, function(res) {
      cb(res);
    });
  },
  deleteOne: function(condition, cb) {
    orm.deleteOne("fitplan_day_exercise_sets", condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = fitplan_day_exercise_set;
