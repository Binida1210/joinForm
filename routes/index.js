var express = require("express");
var router = express.Router();
var connection = require("../config/database");

/* GET home page. */
router.get("/", function (req, res, next) {
  // get data from database
  connection.query(
    "SELECT idx, creator_id, title, hit FROM board ORDER BY idx DESC limit 5",
    function (err, rows) {
      // Handle errors and render the page with data
      if (err) {
        console.error("Error querying database: " + err);
        res.render("index", { title: "게시판 목록", rows: [] });
      } else {
        console.log(rows);
        res.render("index", { title: "게시판 목록", rows: rows });
      }
    }
  );
});

module.exports = router;
