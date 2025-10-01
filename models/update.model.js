var mysql = require("mysql");
var connection = require("../config/database");

/**
 * Get post by idx for updating
 * @param {Number} postIdx - Post index (primary key)
 * @param {Function} callback - Callback function
 */
exports.getPostByIdx = function (postIdx, callback) {
  var sql =
    "SELECT idx, creator_id, title, content, passwd, hit, image_path FROM board WHERE idx = ?";
  connection.query(sql, [postIdx], callback);
};

/**
 * Update post data
 * @param {Number} postIdx - Post index (primary key)
 * @param {Object} data - Updated post data
 * @param {Function} callback - Callback function
 */
exports.updateData = function (postIdx, data, callback) {
  var sql =
    "UPDATE board SET creator_id = ?, title = ?, content = ?, passwd = ?, image_path = ? WHERE idx = ?";
  var params = [
    data.creator_id,
    data.title,
    data.content,
    data.passwd,
    data.image_path,
    postIdx,
  ];
  connection.query(sql, params, callback);
};

/**
 * Verify password before update
 * @param {Number} postIdx - Post index (primary key)
 * @param {String} password - Password to verify
 * @param {Function} callback - Callback function
 */
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
