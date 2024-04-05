const express = require("express");
const router = express.Router();
const { uploadAuthentication } = require("../middlewares/uploadFiles");
const { registro, registro1, registro2, login,  edit,
    update, loginProcess } = require("../controllers/authentication");

const { updateUserValidation } = require("../middlewares/validations");

// /autenticacion
router.get("/registro", registro);
router.get("/registro-paso-2", registro1);
router.get("/registro-paso-3", registro2);   
router.get("/login", login);
router.post("/login", loginProcess);

//*** EDIT ONE USER ***/
router.get("/editar-usuario/:id", edit);
router.put("/editar-usuario/:id", uploadAuthentication.single("userPicture"),updateUserValidation, update);

module.exports = router;