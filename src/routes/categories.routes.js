const express = require("express");
const router = express.Router();
const checkAdmin = require('../middlewares/checkAdmin')
const { listCategory, searchCategory, addCategory, storageCategory, editCategory, updateCategory } = require("../controllers/categories")

// /categorias/buscar-categoria
//*** LIST ALL CATEGORY ***/
router.get("/lista-categorias", listCategory)

//*** SEARCH ALL CATEGORY ***/
router.get("/buscar-categoria",searchCategory)

//*** CREATE ONE CATEGORY ***/
router.get("/crear-categoria/", checkAdmin,  addCategory);
router.post("/crear-categoria/", storageCategory);

//*** EDIT CATEGORY ***/
router.get("/editar-categoria/:id", checkAdmin, editCategory);
router.put("/editar-categoria/:id", updateCategory);

//*** DELETE CATEGORY ***/

module.exports = router;