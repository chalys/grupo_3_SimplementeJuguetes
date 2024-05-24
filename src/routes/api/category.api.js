const router = require("express").Router();

const { listCategoryApi, removeCategoryApi, storeCategoryApi, updateCategoryApi } = require("../../controllers/api/category");

/*** /api/category ***/

router.get("/", listCategoryApi);
router.post("/", storeCategoryApi);
router.put("/:id", updateCategoryApi)
router.delete("/:id", removeCategoryApi);

module.exports = router;