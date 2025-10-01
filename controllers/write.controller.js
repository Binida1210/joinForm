var writeModel = require("../models/write.model");
var upload = require("../config/multer");

// Render write form
exports.writeForm = function (req, res) {
  res.render("write", {
    title: "게시글 작성",
  });
};

// Multer middleware for image upload
exports.uploadMiddleware = upload.single("image_path");

// Handle post creation
exports.writeData = function (req, res) {
  console.log("req.body:", req.body);
  console.log("req.file:", req.file);

  // Validate required fields
  if (
    !req.body.creator_id ||
    !req.body.title ||
    !req.body.content ||
    !req.body.passwd
  ) {
    return res.status(400).send(`
      <script>
        alert('모든 필수 항목을 입력해주세요');
        history.back();
      </script>
    `);
  }

  // Get image filename
  var imageFilename = req.file ? req.file.filename : null;

  // Prepare data
  var data = {
    creator_id: req.body.creator_id,
    title: req.body.title,
    content: req.body.content,
    passwd: req.body.passwd,
    image_path: imageFilename,
  };

  // Insert post
  writeModel.writeData(data, function (err, result) {
    if (err) {
      console.error("Write error:", err);
      return res.status(500).send("Database error");
    }

    // Success redirect
    res.send(`
      <script>
        alert('게시글이 등록되었습니다');
        location.href = '/board/';
      </script>
    `);
  });
};
