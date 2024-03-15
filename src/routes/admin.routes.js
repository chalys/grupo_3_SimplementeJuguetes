// ************ Require's ************
const express = require("express");
const router = express.Router();
const { uploadProducts } = require("../middlewares/uploadFiles");

// ************ Controller Require ************
const { add, store, edit, list } = require("../controllers/admin");
//const {add, store, edit, update, destroy} = require('../controllers/admin');

// /admin

//*** CREATE ONE PRODUCT ***/
router.get("/crear-producto/", add);

router.post(
  "/crear-producto/",
  uploadProducts.fields([
    { name: "firstImg", maxCount: 1 },
    { name: "secondImg", maxCount: 3 },
  ]),
  store
);
router.get('/listado-productos', list);
//*** EDIT ONE PRODUCT ***/
router.get('/editar-producto/', edit);
//router.get('/editar-producto/:id', edit);
//router.put('/editar-producto/:id', uploadProducts.single('img'), update);

//*** DELETE ONE PRODUCT ***/
//router.delete('/eliminar-producto/:id', destroy);

module.exports = router;
