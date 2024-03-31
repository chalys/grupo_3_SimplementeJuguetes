const express = require("express");
const router = express.Router();
const { registro, registro1, registro2, login } = require("../controllers/authentication");
const { uploadUserPicture } = require("../middlewares/uploadUserPicture");
const { userValidation } = require("../middlewares/validations");

// /autenticacion
router.get("/registro", registro);
router.post("/registro",uploadUserPicture.fields([{ name: "userPicture", maxCount: 1 }]),userValidation , registro1);
router.get("/registro-completado", registro2);   
router.get("/login", login);

module.exports = router;