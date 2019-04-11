// Import the ORM to create functions that will interact with the database.
let orm = require("../config/orm.js");

let user = {
  selectAll: function(cb) {
    orm.selectAll("users", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  insertOne: function(cols, vals, cb) {
    orm.insertOne("users", cols, vals, function(res) {
      cb(res);
    });
  },
  updateOne: function(objColVals, condition, cb) {
    orm.updateOne("users", objColVals, condition, function(res) {
      cb(res);
    });
  },
  deleteOne: function(condition, cb) {
    orm.deleteOne("users", condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = user;
