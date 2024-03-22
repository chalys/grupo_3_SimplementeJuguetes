const express = require("express");
const router = express.Router();

const { detail, list }=require("../controllers/products")

// /productos
//*** DETAIL ONE PRODUCT ***/
router.get('/detalle-producto/:id', detail);

//*** LIST ALL PRODUCTS ***/
router.get("/lista-productos", list);
module.exports = router;