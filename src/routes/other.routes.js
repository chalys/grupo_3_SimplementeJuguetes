const express = require("express");
const router = express.Router();
const {home, dashboard, search, contact, aboutus} = require("../controllers/other");

router.get("/", home);
router.get("/home", home);
router.get("/dashboard", dashboard);
router.get('/buscar', search);
router.get('/contacto', contact);
router.get('/sobre-nosotros', aboutus);

module.exports = router;