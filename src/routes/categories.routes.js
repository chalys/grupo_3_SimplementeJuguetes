const express = require("express");
const router = express.Router();

const { listCategory, searchCategory } = require("../controllers/categories")

// /categorias/buscar-categoria
//*** LIST ALL PRODUCT ***/
router.get("/lista-categorias", listCategory)
router.get("/buscar-categoria",searchCategory)

module.exports = router;