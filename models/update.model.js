var mysql = require("mysql");
var connection = require("../config/database");

// Function to get a post by its ID for updating
exports.getPostById = function (id, callback) {
  var sql =
    "SELECT idx, creator_id, title, content, passwd, hit FROM board WHERE idx = ?";
  connection.query(sql, [id], callback);
};

// Function to update post data
exports.updateData = function (id, data, callback) {
  var sql =
    "UPDATE board SET creator_id = ?, title = ?, content = ?, passwd = ? WHERE idx = ?";
  var params = [data.creator_id, data.title, data.content, data.passwd, id];
  connection.query(sql, params, callback);
};

// Function to verify password before update
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
