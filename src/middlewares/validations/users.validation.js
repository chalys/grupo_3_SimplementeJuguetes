const { check, body } = require("express-validator");
const path = require("path");

const exRegArgentinaPostalCode = /^[A-Z]?\d{4}[A-Z]{0,3}$/;
const exRegArgentinaNumberPhone = /^\+54\d{10}$/;

const fieldName = check("name")
  .notEmpty()
  .withMessage("El nombre y apellido es requerido")
  .bail()
  .isAlphanumeric("es-ES", { ignore: " " })
  .withMessage("El nombre y apellido debe ser alfanúmerica")
  .bail()
  .isLength({ min: 5, max: 80 })
  .withMessage("La longitud del nombre y apellido es incorrecta");

const fieldUserPicture = body("userPicture").custom((value, { req }) => {
  const image = req.file;
  const extValid = [".jpg", ".jpeg", ".png", ".gif", ".webp"];

  if (image) {
    const ext = path.extname(image.originalname).toLowerCase(); // Obtener la extensión del archivo en minúsculas
    if (!extValid.includes(ext)) {
      throw new Error("El tipo de imagen es incorrecto");
    }
  }
  return true;
});

const fieldLocality = check("locality")
  .optional({ checkFalsy: true })
  .isAlphanumeric("es-ES", { ignore: " " })
  .withMessage("La localidad debe ser alfanumérica");

const fieldPostal = check("postal")
  .optional({ checkFalsy: true })
  .matches(exRegArgentinaPostalCode)
  .withMessage("El código postal no es válido");

const fieldStreet = check("street")
  .optional({ checkFalsy: true })
  .isAlphanumeric("es-ES", { ignore: " " })
  .withMessage("La dirección debe ser alfanúmerica")
  .bail()
  .isLength({ min: 5, max: 100 })
  .withMessage("La longitud de la dirección es incorrecta");

const fieldStreetNumber = check("streetNumber")
  .optional({ checkFalsy: true })
  .isInt({ min: 1 })
  .withMessage("El número de la dirección debe ser un número entero positivo")
  .bail()
  .custom((value, { req }) => {
    if (value < 1 || value > 9999) {
      throw new Error("El número de la dirección debe estar entre 1 y 9999");
    }
    return true;
  });

const fieldFloor = check("floor")
  .optional({ checkFalsy: true })
  .isInt({ min: 1 })
  .withMessage("El número de piso debe ser un número entero positivo")
  .bail()
  .custom((value, { req }) => {
    if (value < 1 || value > 200) {
      throw new Error("El número de piso debe estar entre 1 y 200");
    }
    return true;
  });

const fieldBetweenSt1 = check("betweenSt1")
  .optional({ checkFalsy: true })
  .isAlphanumeric("es-ES", { ignore: " " })
  .withMessage("La dirección debe ser alfanúmerica")
  .bail()
  .isLength({ min: 5, max: 100 })
  .withMessage("La longitud de la dirección es incorrecta");

const fieldBetweenSt2 = check("betweenSt2")
  .optional({ checkFalsy: true })
  .isAlphanumeric("es-ES", { ignore: " " })
  .withMessage("La dirección debe ser alfanúmerica")
  .bail()
  .isLength({ min: 5, max: 100 })
  .withMessage("La longitud de la dirección es incorrecta");

const fieldPhoneNumber = check("phoneNumber")
  .optional({ checkFalsy: true })
  .matches(exRegArgentinaNumberPhone)
  .withMessage("El número de teléfono no es válido");

const fieldIndications = check("indications")
  .optional({ checkFalsy: true })
  .isAlphanumeric("es-ES", { ignore: " " })
  .withMessage("Las indicaciones adicionales debe ser alfanúmerica")
  .bail()
  .isLength({ min: 5, max: 100 })
  .withMessage("La longitud de las indicaciones adicionales es incorrecta");

const defaultValidationFiels = [fieldName, fieldUserPicture];
module.exports = {
  userStoreValidation: [...defaultValidationFiels],
  userUpdateValidation: [...defaultValidationFiels],
};