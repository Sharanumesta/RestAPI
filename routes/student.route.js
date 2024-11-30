const express = require("express");
const {
  create,
  read,
  update,
  deleted,
} = require("../controllers/student.controller.js");

const router = express.Router();

router.route("/get").get(read);
router.route("/create").post(create);
router.route("/update").put(update);
router.route("/delete").delete(deleted);

module.exports = router;