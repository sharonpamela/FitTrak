var connection = require("../config/connection.js");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
  selectAll: function (tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  selectColumns: function (table, cols, condition) {
    return new Promise(async function (resolve, reject) {
      var queryString = "SELECT " + cols.toString();
      queryString += " FROM " + table;
      queryString += " WHERE ";
      queryString += condition;
      try {
        const result = await connection.promise().query(queryString);
        resolve(result[0]);
      } catch (e) {
        reject(e);
      }
    });
  },
  selectFirstInstance: function (table, cols, condition, orderBy) {
    return new Promise(async function (resolve, reject) {
      var queryString = "SELECT " + cols.toString();
      queryString += " FROM " + table;
      queryString += " WHERE ";
      queryString += condition;
      queryString += " ORDER BY ";
      queryString += orderBy
      queryString += " LIMIT 1";

      try {
        const result = await connection.promise().query(queryString);
        resolve(result[0]);
      } catch (e) {
          reject(e);
      }
    });
  },

  getExercisesAndSets: function (firstTable, secondTable, cols4, joinCol, condition4) {
    return new Promise(async function (resolve, reject) {

      var queryString1 = "SELECT distinct exercise_name, exercise_sequence";
      queryString1 += " FROM " + firstTable + " a ";
      queryString1 += " LEFT JOIN ";
      queryString1 += secondTable + " b ";
      queryString1 += " ON ";
      queryString1 += "b." + joinCol + "= a." + joinCol;
      queryString1 += " WHERE ";
      queryString1 += condition4;

      var queryString2 = "SELECT " + cols4.toString();
      queryString2 += " FROM " + firstTable + " a ";
      queryString2 += " LEFT JOIN ";
      queryString2 += secondTable + " b ";
      queryString2 += " ON ";
      queryString2 += "b." + joinCol + "= a." + joinCol;
      queryString2 += " WHERE ";
      queryString2 += condition4;

      try {
        var exer = await connection.promise().query(queryString1); // exer: [ [Array], [Array] ]
        var sets = await connection.promise().query(queryString2); // sets: [ [Array], [Array] ]
   
        let response = [{exer:exer[0], sets:sets[0]}];
        resolve(response);
      } catch (e) {
          reject(e);
      }
    })
  },

  insertOne: function (table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  // An example of objColVals would be {burger_name: cheeseybob, devoured: 0}
  updateOne: function (table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  deleteOne: function (table, condition, cb) {
    var queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};

// Export the orm object for the model (cat.js).
module.exports = orm;


// async old ways of doing this:
  // selectFirstInstance:function(table, cols, condition, orderBy, cb) {

  //   var queryString = "SELECT " + cols.toString(); 
  //   queryString += " FROM " + table;
  //   queryString += " WHERE " ;
  //   queryString += condition;
  //   queryString += " ORDER BY ";
  //   queryString += orderBy
  //   queryString += " LIMIT 1";

  //   console.log(queryString);
  //   connection.query(queryString, function(err, result) {
  //     if (err) {
  //       throw err;
  //     }
  //     cb(result);
  //   });
  // },
    // selectColumns: function(table, cols, condition, cb) {

  //   var queryString = "SELECT " + cols.toString(); 
  //   queryString += " FROM " + table;
  //   queryString += " WHERE " ;
  //   queryString += condition;

  //   console.log(queryString);
  //   connection.query(queryString, function(err, result) {
  //     if (err) {
  //       throw err;
  //     }
  //     cb(result);
  //   });
  // },
