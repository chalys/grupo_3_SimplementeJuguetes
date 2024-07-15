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
  loginProcess,
  errorAuth,
  logout,
  listUser,
  updateUser,
  editUser,
} = require("../controllers/authentication");

const { updateUserValidation } = require("../middlewares/validations");
const { userValidation } = require("../middlewares/validations");
const { uploadUserPicture } = require("../middlewares/uploadUserPicture");

// /autenticacion

//*** LIST ALL USER ***/
router.get("/lista-usuarios", listUser);

//*** CREATE ONE USER ***/
//router.get("/crear-usuario/", add);

router.get("/registro", registro);
router.post(
  "/registro",
  uploadUserPicture.fields([{ name: "userPicture", maxCount: 1 }]),
  userValidation,
  registro1
);
router.get("/registro-completado", registro2);
router.get("/login", login);
router.post("/login", loginProcess);
router.post("/error", errorAuth);

//*** EDIT ONE USER ***/
router.get("/editar-usuario/:id", updateUser);
router.put("/editar-usuario/:id", editUser);
//router.put("/editar-usuario/:id", updateUserValidation, editUser);
//router.put("/editar-usuario/:id", uploadAuthentication.single("userPicture"),updateUserValidation, editUser);

router.get("/cerrar-session", logout);

module.exports = router;
