var updateModel = require("../models/update.model");
var multer = require("multer");
var path = require("path");
var fs = require("fs");

// Multer configuration
var upload = require("../config/multer");

// Render update form with existing data
exports.updateForm = function (req, res) {
  var postIdx = req.query.idx || req.params.id;

  updateModel.getPostByIdx(postIdx, function (err, results) {
    if (err) {
      console.error("Error fetching post:", err);
      return res.status(500).send("Database error");
    }

    if (results.length === 0) {
      return res.status(404).send("Post not found");
    }

    res.render("update", {
      title: "게시글 수정",
      post: results[0],
    });
  });
};

exports.uploadMiddleware = upload.single("image_path");

// Handle update submission
exports.updateData = function (req, res) {
  var postIdx = req.body.idx;
  var inputPassword = req.body.passwd;

  // First verify password
  updateModel.verifyPassword(postIdx, inputPassword, function (err, isValid) {
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

    // Handle image update
    var newImagePath = null;
    var removeImage = req.body.remove_image === "1";
    var currentImagePath = req.body.current_image_path;

    if (req.file) {
      newImagePath = req.file.filename; // New image uploaded

      // Delete old image
      if (currentImagePath) {
        var oldImageFullPath = path.join(
          __dirname,
          "../public/uploads/",
          currentImagePath
        );
        fs.unlink(oldImageFullPath, function (err) {
          if (err) console.log("Error deleting old image:", err);
        });
      }
    } else if (removeImage) {
      newImagePath = null; // Remove image

      // Delete old image
      if (currentImagePath) {
        var oldImageFullPath = path.join(
          __dirname,
          "../public/uploads/",
          currentImagePath
        );
        fs.unlink(oldImageFullPath, function (err) {
          if (err) console.log("Error deleting image:", err);
        });
      }
    } else {
      // Keep current image
      newImagePath = currentImagePath;
    }

    // Update post data
    var updatedData = {
      creator_id: req.body.creator_id,
      title: req.body.title,
      content: req.body.content,
      passwd: req.body.passwd,
      image_path: newImagePath,
    };

    updateModel.updateData(postIdx, updatedData, function (err, result) {
      if (err) {
        console.error("Update error:", err);
        return res.status(500).send("Database error");
      }

      res.send(`
        <script>
          alert('게시글이 수정되었습니다.');
          location.href = '/board/read/${postIdx}';
        </script>
      `);
    });
  });
};
