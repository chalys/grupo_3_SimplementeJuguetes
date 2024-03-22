// ************ Require's ************
const express = require("express");
const router = express.Router();
const { uploadProducts } = require("../middlewares/uploadFiles");

// ************ Controller Require ************
const {add, edit, store, update} = require("../controllers/admin");


// /admin
//*** CREATE ONE PRODUCT ***/
router.get("/crear-producto/", add);
router.post(
  "/crear-producto/",
  uploadProducts.fields([
    { name: "firstImg", maxCount: 1 },
    { name: "secondImg", maxCount: 3 },
  ]),
  store
);

//*** EDIT ONE PRODUCT ***/
router.get("/editar-producto/:id", edit);
router.put("/editar-producto/:id", update);

//*** DELETE ONE PRODUCT ***/



module.exports = router;
