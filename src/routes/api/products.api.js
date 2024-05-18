const router = require("express").Router()

const {
    listApi,
    storeApi,
    updateApi,
    removeApi
  } = require("../../controllers/api/admin");
  
const { countApi } = require("../../controllers/api/products");
const { uploadProducts } = require("../../middlewares/uploads");

router.get("/total-productos", countApi);
  


  // /* /api/products */
   router.get("/", listApi);
   router.post(
     "/",
     uploadProducts.fields([
       { name: "firstImg" },
       { name: "secondImg" },
     ]),
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