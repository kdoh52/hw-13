// IMPORT (REQUIRE) CONNECTION.JS
let connection = require("./connection.js");


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




// CREATE METHODS
let orm = {
    // selectAll: function(tableInput, cb) {
    //     let queryString = "SELECT * FROM ??;";
    //     connection.query(queryString, [tableInput], function(err, result) {
    //         if (err) throw err;
    //         cb(result);
    //     });
    // },
    selectAll: function(tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result) {
          if (err) {
            throw err;
          }
          cb(result);
        });
      },
    // insertOne: function(tableInput, cols, vals, cb) {
    //     let queryString = "INSERT INTO ?? (??) VALUES (?);";
    //     connection.query(queryString, [tableInput, cols, vals], function(err, result) {
    //         if (err) throw err;
    //         cb(result);
    //     });
    // },
    insertOne: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;
    
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";
    
        console.log(queryString);
    
        connection.query(queryString, vals, function(err, result) {
          if (err) {
            throw err;
          }
    
          cb(result);
        });
    },
    // updateOne: function(tableInput, colToSet, setVal, colToSearch, valOfCol, cb) {
    //     let queryString = "UPDATE ?? SET ??=? WHERE ??=?";
    //     connection.query(queryString, [tableInput, colToSet, setVal, colToSearch, valOfCol], function(err, result) {
    //         if (err) throw err;
    //         cb(result);
    //     });
    // }
    updateOne: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;
    
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;
    
        console.log(queryString);
        connection.query(queryString, function(err, result) {
          if (err) {
            throw err;
          }
    
          cb(result);
        });
    }
};

// EXPORT THE ORM OBJECT (module.exports)
module.exports = orm;
