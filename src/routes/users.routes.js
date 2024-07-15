const express = require("express");
const router = express.Router();
const { uploadUsers } = require("../middlewares/uploads");
const checkSessionRoute = require("../middlewares/checkSessionRoute");
const { userUpdateValidation } = require("../middlewares/validations");
const { updateProfile, profile, favorite } = require("../controllers/users");

// /usuario/
router.get("/favoritos", favorite);

//*** EDIT USER ***/
router.get("/perfil", checkSessionRoute, profile);
router.put(
  "/perfil",
  uploadUsers.single("userPicture"),
  checkSessionRoute,
  userUpdateValidation,
  updateProfile
);

module.exports = router;
