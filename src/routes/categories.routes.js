const express = require("express");
const router = express.Router();
const checkAdmin = require('../middlewares/checkAdmin')
const { listCategory, searchCategory, addCategory, storageCategory } = require("../controllers/categories")

// /categorias/buscar-categoria
//*** LIST ALL PRODUCT ***/
router.get("/lista-categorias", listCategory)

//*** SEARCH ALL PRODUCT ***/
router.get("/buscar-categoria",searchCategory)

//*** CREATE ONE PRODUCT ***/
router.get("/crear-categoria/", checkAdmin,  addCategory);
router.post("/crear-categoria/", storageCategory);

module.exports = router;