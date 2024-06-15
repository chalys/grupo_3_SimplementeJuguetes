const router = require("express").Router();
const { uploadProducts } = require("../../middlewares/uploads");
const {listProductApi, detailProductApi, storeProductApi, updateProductApi, removeProductApi, listGeneral } = require("../../controllers/api/products");

/*** /api/products ***/

/*** Listar Producto ***/
//router.get("/", listProductApi);

/*** Listar General ***/
router.get("/", listGeneral);


/*** Detakke Producto ***/
router.get("/:id", detailProductApi);

/*** Crear Producto ***/
router.post("/",uploadProducts.fields([{ name: "firstImg" }, { name: "secondImg" }]),storeProductApi);

/***  Actualizar Producto ***/
router.put("/:id",uploadProducts.fields([{ name: "firstImg" }, { name: "secondImg" }]),updateProductApi);

/*** Eliminar Producto ***/
router.delete("/:id",removeProductApi)

module.exports = router;
