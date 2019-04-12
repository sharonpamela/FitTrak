// Import the ORM to create functions that will interact with the database.
let orm = require("../config/orm.js");

let fitplan_day_exercise = {
  selectAll: function(cb) {
    orm.selectAll("fitplan_day_exercises", function(res) {
      cb(res);
    });
  },
  getExercisesAndSets: function(firstTable, secondTable, cols4, joinCol, condition4){
    return new Promise (async function (resolve, reject){
      try{
        const res = await orm.getExercisesAndSets(firstTable, secondTable, cols4, joinCol, condition4)
        resolve(res);
      } catch (e){
        reject(e);
      }
    })
  },

  // The variables cols and vals are arrays.
  insertOne: function(cols, vals, cb) {
    orm.insertOne("fitplan_day_exercises", cols, vals, function(res) {
      cb(res);
    });
  },
  updateOne: function(objColVals, condition, cb) {
    orm.updateOne("fitplan_day_exercises", objColVals, condition, function(res) {
      cb(res);
    });
  },
  deleteOne: function(condition, cb) {
    orm.deleteOne("fitplan_day_exercises", condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = fitplan_day_exercise;
