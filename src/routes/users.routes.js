const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");

router.get("/favoritos", userController.favorite);
router.get("/perfil/:id", userController.profile);

module.exports = router;
