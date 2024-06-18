const router = require("express").Router()
const { listUserApi, detailUserApi, storeUserApi, updateUserApi, removeUserApi } = require("../../controllers/api/users")

/*** /api/users ***/
/*** Listar Usuario ***/
router.get("/", listUserApi);

/*** Detalle Usuario ***/
router.get("/:id", detailUserApi);

/*** Crear Usuario ***/
//router.post("/",uploadUsers.fields([{ name: "userPicture" }]),storeUserApi);
//router.post("/",uploadUserPicture.fields([{ name: "userPicture", maxCount: 1 }]),storeUserApi);

/***  Actualizar Usuario ***/
//router.put("/:id",uploadAuthentication.single("userPicture"), updateUserApi);

/*** Eliminar Usuario ***/
//router.delete("/:id",removeUserApi)

module.exports = router;