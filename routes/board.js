var express = require("express");
var router = express.Router();
var multer = require("multer");

var listController = require("../controllers/list.controller");
var writeController = require("../controllers/write.controller");
var readController = require("../controllers/read.controller");
var updateController = require("../controllers/update.controller");

router.get("/", listController.list); // Get all list
router.get("/list/1", listController.getListFirst); // Get first list item
router.get("/list/:id", listController.getListById); // Get list item by id

router.get("/write", writeController.writeForm); // Render write form
router.post("/write", writeController.writeData); // Handle form submission

router.get("/read/:id", readController.readData); // Read specific post by id

router.get("/update", updateController.updateForm); // Render update form
router.post("/update", multer().none(), (req, res) => {
  updateController.updateData(req, res);
}); // Handle update submission

module.exports = router;
