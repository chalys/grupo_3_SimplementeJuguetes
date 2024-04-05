const {check,body} =require("express-validator")
const { loadData } = require("../../data");
const path = require("path");

loginValidation= [
    body("name").notEmpty().trim().escape().withMessage("Debe rellenar el campo"),
    body("password").notEmpty().trim().escape().withMessage("Debe rellenar el campo")


]

module.exports = loginValidation