// ************ Require's ************
const express = require("express");
const router = express.Router();
const { uploadProducts } = require("../middlewares/uploadFiles");

// ************ Controller Require ************
const {destroy, add, store, editarProducto, editsProducts, listProduct } = require("../controllers/admin");
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

//*** LIST ALL PRODUCT ***/
router.get('/lista-productos', listProduct);

//router de edicion de productos
router.get("/editar-producto/:id", editarProducto);
router.put("/editar-producto/:id", editsProducts);
router.delete('/eliminar-producto/:id', destroy);
module.exports = router;
