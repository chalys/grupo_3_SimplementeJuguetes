const router = require("express").Router();
const { uploadProducts } = require("../../middlewares/uploads");
const {listProductApi,  storeProductApi, updateProductApi, removeProductApi, renderImgApi, detailProductApi} = require("../../controllers/api/products");

/*** /api/products ***/

/*** Listar Producto ***/
router.get("/", listProductApi);

/*** Detalle Producto ***/
router.get("/detail/:id", detailProductApi);

/*** Crear Producto ***/
router.post("/",uploadProducts.fields([{ name: "firstImg" }, { name: "secondImg" }]),storeProductApi);

/***  Actualizar Producto ***/
router.put("/:id",uploadProducts.fields([{ name: "firstImg" }, { name: "secondImg" }]),updateProductApi);

/*** Eliminar Producto ***/
router.delete("/:id",removeProductApi)

/*** Mostrar Imagen*/
router.get("/:image" , renderImgApi);

module.exports = router;
