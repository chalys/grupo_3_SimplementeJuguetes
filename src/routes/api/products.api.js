const router = require("express").Router();

const {listProductApi, detailProductApi } = require("../../controllers/api/products");

/*** /api/products ***/
router.get("/", listProductApi);
router.get("/:id", detailProductApi);



const { uploadProducts } = require("../../middlewares/uploads");


const {
  listApi,
  storeApi,
  updateApi,
  removeApi,
} = require("../../controllers/api/admin");








router.post(
  "/",
  uploadProducts.fields([{ name: "firstImg" }, { name: "secondImg" }]),
  storeApi
);

// router.put(
//   "/:id",
//   uploadProducts.fields([
//     { name: "imagePrincipal" },
//     { name: "imagesSecondary" },
//   ]),
//   updateApi
// );

// router.delete("/:id", removeApi);

// router.get("/:image", renderImg)

module.exports = router;
