const router = require("express").Router()
const { listUserApi, detailUserApi } = require("../../controllers/api/users")

/*** /api/users ***/
router.get("/", listUserApi);
router.get("/:id", detailUserApi);

module.exports = router;