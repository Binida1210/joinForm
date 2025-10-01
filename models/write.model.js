var mysql = require("mysql");
var connection = require("../config/database");

// Function to insert new post data
exports.insertData = function (data, callback) {
  var sql =
    "INSERT INTO board (creator_id, title, content, passwd) VALUES (?, ?, ?, ?)";
  var params = [data.creator_id, data.title, data.content, data.passwd];
  connection.query(sql, params, callback);
};
