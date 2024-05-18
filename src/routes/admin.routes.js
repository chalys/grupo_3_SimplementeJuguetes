// ************ Require's ************
const express = require("express");
const router = express.Router();
const { uploadProducts } = require("../middlewares/uploadFiles");
const {productsValidationStore} = require("../middlewares/validations")

// ************ Controller Require ************
const {
  listProduct,
  addProduct,
  updateProduct,
  storeProduct,
  editProduct,
  deleteProduct,
  removeProduct,
} = require("../controllers/admin");

// /admin

//*** LIST ALL PRODUCT ***/
router.get("/lista-productos", listProduct);

//*** CREATE ONE PRODUCT ***/
router.get("/crear-producto/", addProduct);
router.post(
  "/crear-producto/",
  uploadProducts.fields([
    { name: "firstImg", maxCount: 1 },
    { name: "secondImg", maxCount: 4 },
  ]),
  productsValidationStore,
  storeProduct
);

//*** EDIT PRODUCT ***/
router.get("/editar-producto/:id", updateProduct);
router.put("/editar-producto/:id",
  /*
  uploadProducts.fields([
    { name: "imagePrincipal" },
    { name: "imagesSecondary" },
]),
  productsValidationUpdate,*/
  editProduct
);

//*** DELETE PRODUCT */
router.get("/eliminar-producto", deleteProduct);
router.delete("/eliminar-producto/:id", removeProduct);
//router.delete('/eliminar-producto/:id', destroy);

module.exports = router;
