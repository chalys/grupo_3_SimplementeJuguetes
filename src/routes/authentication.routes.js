const express = require("express");
const router = express.Router();
const { registro, registro1, registro2, login, processLogin } = require("../controllers/authentication");

// /autenticacion
router.get("/registro", registro);
router.get("/registro-paso-2", registro1);
router.get("/registro-paso-3", registro2);   
router.get("/login", login);
router.post("login",processLogin)

module.exports = router;