const express = require("express");
const router = express.Router();
const authController = require("../controllers/authentication")

router.get("/registro", authController.registro);
router.get("/registro-segunda-parte", authController.registro1);
router.get("/registro-tercera-parte", authController.registro2);   

router.get("/login", authController.login);

module.exports = router;