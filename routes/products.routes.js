const express = require("express");
const router = express.Router();
const prodController = require("../controllers/products");

router.get('/detalle/:id', prodController.detail);
router.get("/registro-producto", prodController.registroProducto);


//router de edicion de productos
router.get("/editarProducto/:id", prodController.editarProducto);
router.put("/editarProducto/:id", prodController.editsProducts);

router.get("/lista-productos", prodController.listaProductos)
module.exports = router;