const express = require("express");
const router = express.Router();
const { registro, registro1, registro2, login, edit } = require("../controllers/authentication");

// /autenticacion
//*** CREATE ONE USER ***/
//router.get("/crear-usuario/", add);
router.get("/registro", registro);
router.get("/registro-paso-2", registro1);
router.get("/registro-paso-3", registro2);   
router.get("/login", login);

//*** EDIT ONE USER ***/
router.get("/editar-usuario/:id", edit);
router.put("/editar-usuario/:id", edit);




module.exports = router;