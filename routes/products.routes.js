const express = require("express");
const router = express.Router();
const prodController = require("../controllers/products");

router.get("/detalle", prodController.detail);

module.exports = router;