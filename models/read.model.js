var mysql = require("mysql");
var connection = require("../config/database");

// Function to get a post by its ID
exports.getPostById = function (id, callback) {
  var sql =
    "SELECT idx, creator_id, content, title, hit FROM board WHERE idx = ?";
  connection.query(sql, [id], callback);
};

// Function to increase the hit count of a post
exports.increaseHit = function (id, callback) {
  var sql = "UPDATE board SET hit = hit + 1 WHERE idx = ?";
  connection.query(sql, [id], callback);
};
