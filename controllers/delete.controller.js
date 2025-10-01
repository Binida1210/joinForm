var deleteModel = require("../models/delete.model");
var path = require("path");
var fs = require("fs");

// Handle delete submission
exports.deleteData = function (req, res) {
  var postIdx = req.body.idx;
  var inputPassword = req.body.passwd;

  // First get post data to check for image
  deleteModel.getPostByIdx(postIdx, function (err, results) {
    if (err) {
      console.error("Error fetching post:", err);
      return res.status(500).send("Database error");
    }

    if (results.length === 0) {
      return res.status(404).send("Post not found");
    }

    var post = results[0];

    // Verify password
    deleteModel.verifyPassword(postIdx, inputPassword, function (err, isValid) {
      if (err) {
        console.error("Password verification error:", err);
        return res.status(500).send("Database error");
      }

      if (!isValid) {
        return res.send(`
          <script>
            alert('비밀번호가 일치하지 않습니다.');
            history.back();
          </script>
        `);
      }

      // Password correct, delete post
      deleteModel.deletePost(postIdx, function (err, result) {
        if (err) {
          console.error("Delete error:", err);
          return res.status(500).send("Database error");
        }

        // Delete image file if exists
        if (post.image_path) {
          var imagePath = path.join(
            __dirname,
            "../public/uploads/",
            post.image_path
          );
          fs.unlink(imagePath, function (err) {
            if (err) console.log("Error deleting image file:", err);
          });
        }

        res.send(`
          <script>
            alert('게시글이 삭제되었습니다.');
            location.href = '/board/';
          </script>
        `);
      });
    });
  });
};
