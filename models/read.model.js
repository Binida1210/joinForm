var mysql = require("mysql");
var connection = require("../config/database");

/**
 * Get post by ID and increment hit count
 * @param {Number} postIdx - Post index (primary key)
 * @param {Function} callback - Callback function
 */
exports.getPostByIdx = function (postIdx, callback) {
  // Increment hit count first
  var updateHitSql = "UPDATE board SET hit = hit + 1 WHERE idx = ?";
  connection.query(updateHitSql, [postIdx], function (err) {
    if (err) {
      console.error("Error updating hit count:", err);
    }

    // Fetch post data with image filename
    var selectSql =
      "SELECT idx, creator_id, title, content, passwd, hit, image_path FROM board WHERE idx = ?";
    connection.query(selectSql, [postIdx], callback);
  });
};
