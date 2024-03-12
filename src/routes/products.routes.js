const express = require("express");
const router = express.Router();
const { detail, listaProductos, cart } = require("../controllers/products");


// /productos
router.get("/detalle", detail);
router.get("/lista-productos", listaProductos)


module.exports = router;