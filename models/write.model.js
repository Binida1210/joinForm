var mysql = require("mysql");
var connection = require("../config/database");

// Function to insert new post data
exports.writeData = function (data, callback) {
  var sql =
    "INSERT INTO board (creator_id, title, content, passwd, image_path) VALUES (?, ?, ?, ?, ?)";
  var params = [
    data.creator_id,
    data.title,
    data.content,
    data.passwd,
    data.image_path || null, // Set to null if no image uploaded
  ];
  connection.query(sql, params, callback);
};
