var express = require("express");
var router = express.Router();

// Render the join form
router.get("/", function (req, res, next) {
  res.render("joinForm", { title: "Join Form" });
});

// Handle form submission
router.post("/", function (req, res, next) {
  var userData = {
    userId: req.body.userId,
    userPw: req.body.userPw,
    userName: req.body.userName,
    userEmail: req.body.userEmail,
    userPhone: req.body.userPhone,
    userAddr: req.body.userAddr,
    userJob: req.body.userJob,
    userGender: req.body.userGender,
    userBirth: req.body.userBirth,
  };

  console.log("Received data:", userData);
  res.json(userData); // respond with the received data
});

module.exports = router;
