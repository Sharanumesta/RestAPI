const express = require("express");
const {
  create,
  read,
  update,
  deleted,
} = require("../controllers/student.controller.js");

const router = express.Router();

router.route("/create").post(create);
router.route("/get").get(read);
router.route("/update").post(update);
router.route("/delete").post(deleted);

module.exports = router;