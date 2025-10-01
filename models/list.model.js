var mysql = require("mysql");
var connection = require("../config/database");

// Function to get the list of posts by descending order of idx
exports.getList = function (callback) {
  var sql = "SELECT idx, creator_id, title, hit FROM board ORDER BY idx DESC";
  connection.query(sql, callback);
};

// Function to get the first post (idx = 1)
exports.getListFirst = function (callback) {
  var sql = "SELECT * FROM board WHERE idx = 1";
  connection.query(sql, callback);
};

// Function to get post by ID
exports.getListById = function (id, callback) {
  var sql = `SELECT * FROM board WHERE idx = ?`;
  connection.query(sql, [id], callback);
};
