// Import the ORM to create functions that will interact with the database.
let orm = require("../config/orm.js");

let fitplan_day = {
  selectAll: function(cb) {
    orm.selectAll("fitplan_days", function(res) {
      cb(res);
    });
  },

  // selectFirstInstance: function(table, cols, condition, orderBy, cb) {
  //   orm.selectFirstInstance(table, cols, condition, orderBy, function(res) {
  //     cb(res);
  //   });
  // },
  selectFirstInstance: function(table, cols, condition, orderBy) {
    return new Promise (async function (resolve, reject){
      try{
        const res = await orm.selectFirstInstance(table, cols, condition, orderBy)
        resolve(res);
      } catch (e){
        reject(e);
      }
    })
  },

  // The variables cols and vals are arrays.
  insertOne: function(cols, vals, cb) {
    orm.insertOne("fitplan_days", cols, vals, function(res) {
      cb(res);
    });
  },
  updateOne: function(objColVals, condition, cb) {
    orm.updateOne("fitplan_days", objColVals, condition, function(res) {
      cb(res);
    });
  },
  deleteOne: function(condition, cb) {
    orm.deleteOne("fitplan_days", condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = fitplan_day;
