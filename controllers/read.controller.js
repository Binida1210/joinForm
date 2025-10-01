var readModel = require("../models/read.model");

exports.readData = function (req, res, next) {
  var postId = req.params.id;

  // Retrieve post data by ID
  readModel.getPostById(postId, function (err, results) {
    if (err) {
      console.error("Error fetching post:", err);
      return res.status(500).send("Internal Server Error");
    }
    if (results.length === 0) {
      return res.status(404).send("Post not found");
    }

    // Increase hit count after successfully retrieving data
    readModel.increaseHit(postId, function (hitErr, hitResult) {
      // Log error if hit count update fails, but still render the post
      if (hitErr) {
        console.error("Error updating hit:", hitErr);
      }
    });

    // Render the read view with post data
    res.render("read", {
      title: "게시판 글 조회",
      post: results[0],
    });
  });
};
