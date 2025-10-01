var updateModel = require("../models/update.model");

// Render update form with existing data
exports.updateForm = function (req, res) {
  var postId = req.query.idx;

  // Fetch existing post data by ID
  updateModel.getPostById(postId, function (err, results) {
    if (err) {
      console.error("Error fetching post:", err);
      return res.status(500).send("Database error");
    }

    // Render the update form with existing post data
    res.render("update", {
      title: "게시글 수정",
      post: results[0],
    });
  });
};

// Handle update submission
exports.updateData = function (req, res) {
  var postId = req.body.idx;
  var inputPassword = req.body.passwd;

  // First verify password
  updateModel.verifyPassword(postId, inputPassword, function (err, isValid) {
    if (err) {
      console.error("Password verification error:", err);
      return res.status(500).send("Database error");
    }

    // If password is incorrect redirect back with alert
    if (!isValid) {
      return res.send(`
        <script>
          alert('비밀번호가 일치하지 않습니다.');
          history.back();
        </script>
      `);
    }

    // Password is correct, proceed with update
    var updatedData = {
      creator_id: req.body.creator_id,
      title: req.body.title,
      content: req.body.content,
      passwd: req.body.passwd,
    };

    // Update the post data in the database
    updateModel.updateData(postId, updatedData, function (err, result) {
      if (err) {
        console.error("Update error:", err);
        return res.status(500).send("Database error");
      }

      // Redirect to the updated post view with success alert
      res.send(`
        <script>
          alert('게시글이 수정되었습니다.');
          location.href = '/board/read/${postId}';
        </script>
      `);
    });
  });
};
