const router = require("express").Router();
const { metricsApi, getQueryApi } = require("../../controllers/api/other");

/*** /api ***/

/*** Listar Metricas ***/
router.get("/metrics", metricsApi);

/*** Listar Query ***/
router.get("/query", getQueryApi);

module.exports = router;
