var listModel = require("../models/list.model");

exports.list = function (req, res) {
  // Fetch list data from the model
  listModel.getList(function (err, rows) {
    if (err) {
      console.error(err);
      return res.status(500).send("Database error");
    }

    // Render the list view with fetched data
    res.render("list", {
      title: "게시판 전체 글 조회",
      rows: rows,
    });
  });
};

exports.getListFirst = function (req, res) {
  // Fetch the first post from the model
  listModel.getListFirst(function (err, rows) {
    if (err) {
      console.error(err);
      return res.status(500).send("Database error");
    }

    // Render the list view with fetched data
    res.render("list", {
      title: "게시판 첫 번째 글 조회",
      rows: rows,
    });
  });
};

exports.getListById = function (req, res) {
  // Fetch post by ID from the model
  var id = req.params.id;

  // Fetch the post by ID
  listModel.getListById(id, function (err, rows) {
    if (err) {
      console.error(err);
      return res.status(500).send("Database error");
    }

    // Render the list view with fetched data
    res.render("list", {
      title: "게시판 " + id + "번째 글 조회",
      rows: rows,
    });
  });
};
