const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");

router.get("/favoritos", userController.favorite);
router.get("/perfil", userController.profile);

module.exports = router;
