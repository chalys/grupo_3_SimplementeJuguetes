// ************ Require's ************
const express = require("express");
const router = express.Router();
const { uploadAuthentication } = require("../middlewares/uploadFiles");

// ************ Controller Require ************
const {
  registro,
  registro1,
  registro2,
  login,
  edit,
  update,
} = require("../controllers/authentication");

const { updateUserValidation } = require("../middlewares/validations");
const { userValidation } = require("../middlewares/validations");
const { uploadUserPicture } = require("../middlewares/uploadUserPicture");

//*** CREATE ONE USER ***/
//router.get("/crear-usuario/", add);

// /autenticacion
router.get("/registro", registro);
router.post("/registro",uploadUserPicture.fields([{ name: "userPicture", maxCount: 1 }]),userValidation , registro1);
router.get("/registro-completado", registro2);   
router.get("/login", login);


//*** EDIT ONE USER ***/
router.get("/editar-usuario/:id", edit);
router.put("/editar-usuario/:id", uploadAuthentication.single("userPicture"),updateUserValidation, update);

//*** DELETE ONE USER ***/
//router.delete('/eliminar-usuario/:id', destroy);

module.exports = router;
