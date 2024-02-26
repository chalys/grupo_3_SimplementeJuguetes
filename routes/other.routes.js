const express = require("express");
const router = express.Router();
const otherController = require("../controllers/other");

router.get("/", otherController.home);
router.get("/home", otherController.home);
router.get("/dashboard", otherController.dashboard);

module.exports = router;