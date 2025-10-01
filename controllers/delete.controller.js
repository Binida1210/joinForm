var deleteModel = require("../models/delete.model");

// Handle delete submission
exports.deleteData = function (req, res) {
  var postId = req.body.idx;
  var inputPassword = req.body.passwd;

  // First verify password
  deleteModel.verifyPassword(postId, inputPassword, function (err, isValid) {
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

    // Password is correct, proceed with delete
    deleteModel.deletePost(postId, function (err, result) {
      if (err) {
        console.error("Delete error:", err);
        return res.status(500).send("Database error");
      }

      res.send(`
        <script>
          alert('게시글이 삭제되었습니다.');
          location.href = '/board/';
        </script>
      `);
    });
  });
};
