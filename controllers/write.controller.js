var writeModel = require("../models/write.model");

// render write form
exports.writeForm = function (req, res) {
  res.render("write", {
    title: "게시판 글 작성",
  });
};

// handle form submission
exports.writeData = function (req, res) {
  var data = {
    creator_id: req.body.creator_id,
    title: req.body.title,
    content: req.body.content,
    passwd: req.body.passwd,
  };

  // Insert data into the database
  writeModel.insertData(data, function (err, result) {
    if (err) {
      console.error(err);
      return res.status(500).send("Database error");
    }

    // Redirect to the list view after successful insertion
    res.redirect("/");
  });
};
