// ************ Require's ************
const express = require("express");
const router = express.Router();
const passport = require("passport");
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
  registerUser,
  loginAndRegisterGoogle,
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

router.get("/registrar-usuario", registerUser);

//*** EDIT ONE USER ***/
router.get("/editar-usuario/:id", updateUser);
router.put("/editar-usuario/:id", editUser);
//router.put("/editar-usuario/:id", updateUserValidation, editUser);
//router.put("/editar-usuario/:id", uploadAuthentication.single("userPicture"),updateUserValidation, editUser);

router.get("/cerrar-session", logout);


passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// LOGIN GOOGLE
//router.get("/iniciar/google", passport.authenticate("google"));

// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "/0/iniciar",
//   }),
//   loginAndRegisterGoogle
// );

router.get("/login/google", passport.authenticate("google"));
router.get("/google/callback", passport.authenticate("google", {failureRedirect: "/0/login"}), loginAndRegisterGoogle);

module.exports = router;
