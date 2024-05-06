const express = require("express");
const router = express.Router();

const {detailProduct, listProduct } = require("../controllers/products")

router.get('/detalle-producto/:id', detailProduct);
router.get("/lista-productos", listProduct)

module.exports = router;