var readModel = require("../models/read.model");

// Display post details and increment hit count
exports.readData = function (req, res) {
  var postIdx = req.params.id;
  console.log("Requested post idx:", postIdx);

  // Validate idx
  if (!postIdx) {
    return res.status(400).send("Post idx is required");
  }

  // Fetch post data
  readModel.getPostByIdx(postIdx, function (err, results) {
    if (err) {
      console.error("Error fetching post:", err);
      return res.status(500).send("Database error");
    }

    if (results.length === 0) {
      return res.status(404).send("Post not found");
    }

    // Render view
    res.render("read", {
      title: "게시글 상세보기",
      post: results[0],
    });
  });
};
