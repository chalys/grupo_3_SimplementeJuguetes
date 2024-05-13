const { check, body } = require("express-validator");
const path = require("path");

const regExpFiles = /.png|.jpg|.jpeg|.webp|.gif/i;

const fieldName = check("name")
  .notEmpty()
  .withMessage("El nombre es requerido")
  .bail()
  .isAlphanumeric("es-ES", { ignore: " .," })
  .withMessage("El nombre debe ser alfanumerico")
  .bail()
  .isLength({ min: 5, max: 100 })
  .withMessage("El nombre debe tener un minimo de 5 caracteres");
  const defaultValidationFiels = [
    fieldName
  ];
  
  module.exports = {
    productsValidationStore: [
      ...defaultValidationFiels,
    ],
    productsValidationUpdate: [
      ...defaultValidationFiels,
    ],
  };