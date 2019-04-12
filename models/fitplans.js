// Import the ORM to create functions that will interact with the database.
let orm = require("../config/orm.js");

let fitplan = {
  selectAll: function(cb) {
    orm.selectAll("fitplans", function(res) {
      cb(res);
    });
  },
  // selectColumns: function(table, cols, condition, cb) {
  //   orm.selectColumns(table, cols, condition, function(res) {
  //     cb(res);
  //   });
  // },
  selectColumns: function(table, cols, condition) {
    return new Promise(async function(resolve, reject){
      try {
        const res = await orm.selectColumns(table, cols, condition);
        resolve(res);
      } catch(e){
        reject(e)
      }
    });
  },
  // The variables cols and vals are arrays.
  insertOne: function(cols, vals, cb) {
    orm.insertOne("fitplans", cols, vals, function(res) {
      cb(res);
    });
  },
  updateOne: function(objColVals, condition, cb) {
    orm.updateOne("fitplans", objColVals, condition, function(res) {
      console.log(objColVals);
      cb(res);
    });
  },
  deleteOne: function(condition, cb) {
    orm.deleteOne("fitplans", condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = fitplan;
