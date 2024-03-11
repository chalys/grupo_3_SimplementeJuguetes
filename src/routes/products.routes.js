const express = require("express");
const router = express.Router();
const { detail, listaProductos } = require("../controllers/products");


// /productos
router.get("/detalle", detail);
router.get("/lista-productos", listaProductos)

/*router.get("/editarProducto", prodController.editarProducto)*/

module.exports = router;