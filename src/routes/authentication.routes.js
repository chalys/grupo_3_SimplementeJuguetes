// ************ Require's ************
const express = require("express");
const router = express.Router();
const { uploadAuthentication } = require('../middlewares/uploadFiles');

// ************ Controller Require ************
const { registro, registro1, registro2, login, edit, update } = require("../controllers/authentication");

// /autenticacion

//*** CREATE ONE USER ***/
//router.get("/crear-usuario/", add);
router.get("/registro", registro);
router.get("/registro-paso-2", registro1);
router.get("/registro-paso-3", registro2);   
router.get("/login", login);

//*** EDIT ONE USER ***/
router.get("/editar-usuario/:id", edit);
router.put("/editar-usuario/:id",uploadAuthentication.single('img'), update);


//*** DELETE ONE USER ***/
//router.delete('/eliminar-usuario/:id', destroy);

module.exports = router;