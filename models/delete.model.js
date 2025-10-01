var mysql = require("mysql");
var connection = require("../config/database");

// Function to verify password before delete
exports.verifyPassword = function (id, password, callback) {
  var sql = "SELECT passwd FROM board WHERE idx = ?";
  connection.query(sql, [id], function (err, results) {
    if (err) {
      return callback(err, null);
    }
    if (results.length === 0) {
      return callback(null, false);
    }
    // Compare passwords
    var isValid = results[0].passwd === password;
    callback(null, isValid);
  });
};

// Function to delete post
exports.deletePost = function (id, callback) {
  var sql = "DELETE FROM board WHERE idx = ?";
  connection.query(sql, [id], callback);
};
