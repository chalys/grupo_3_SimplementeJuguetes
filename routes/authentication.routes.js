const express = require("express");
const router = express.Router();
const authController = require("../controllers/authentication")

router.get("/registro", authController.registro);
router.get("/registro-paso-2", authController.registro1);
router.get("/registro-paso-3", authController.registro2);   

router.get("/login", authController.login);

module.exports = router;