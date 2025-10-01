var mysql = require("mysql");
var connection = require("../config/database");

// Function to get post by idx (for checking image before delete)
exports.getPostByIdx = function (postIdx, callback) {
  var sql = "SELECT idx, image_path, passwd FROM board WHERE idx = ?";
  connection.query(sql, [postIdx], callback);
};

// Function to verify password before delete
exports.verifyPassword = function (postIdx, password, callback) {
  var sql = "SELECT passwd FROM board WHERE idx = ?";
  connection.query(sql, [postIdx], function (err, results) {
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
exports.deletePost = function (postIdx, callback) {
  var sql = "DELETE FROM board WHERE idx = ?";
  connection.query(sql, [postIdx], callback);
};
