const { check, body } = require("express-validator");
const path = require("path");
/*
const fieldUserName = check("userName")
  .notEmpty()
  .withMessage("El nombre de usuario es requerido");

const fieldEmail = check("email")
  .isEmail()
  .withMessage("El email no es válido");

const fieldPassword = check("password")
  .isStrongPassword()
  .withMessage("La contraseña debe ser segura");
*/
const fieldName = check("name")
  .notEmpty()
  .withMessage("El nombre y apellido es requerido")
  .bail()
  .isAlphanumeric("es-ES", { ignore: " " })
  .withMessage("El nombre y apellido debe ser alfanúmerica")
  .bail()
  .isLength({ min: 5, max: 80 })
  .withMessage("La longitud del nombre y apellido es incorrecta");

const fieldLocality = check("locality")
  .optional({ checkFalsy: true })
  .isAlphanumeric("es-ES", { ignore: " " })
  .withMessage("La localidad debe ser alfanumérica");

const fieldPostal = check("postal")
  .optional({ checkFalsy: true })
  .isPostalCode("ES")
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
  .isMobilePhone()
  .withMessage("El número de teléfono no es válido");

  const fieldIndications = check("indications")  
  .optional({ checkFalsy: true })
  .isAlphanumeric("es-ES", { ignore: " " })
  .withMessage("Las indicaciones adicionales debe ser alfanúmerica")
  .bail()
  .isLength({ min: 5, max: 100 })
  .withMessage("La longitud de las indicaciones adicionales es incorrecta");
/*
const fieldProvince = check("province")
  .not().isIn([""])
  .withMessage("La provincia es requerida");

const fieldUserPicture = body("userPicture").custom((value, { req }) => {
  const image = req.file;
  const extValid = [".png", ".webp", ".jpeg", ".jpg"];
  if (image?.filename) {
    const file = req.file?.filename;
    const ext = path.extname(image.filename);

    if (!file) throw new Error("El archivo es requerido");
    else {
      if (!extValid.includes(ext)) {
        throw new Error("El tipo de imagen es incorrecto");
      }
    }
  }
  return true;
}
);*/
/*
module.exports = [
  fieldUserName,
  fieldEmail,
  fieldPassword,
  fieldName,
  fieldProvince,
  fieldLocality,
  fieldPostal,
  fieldStreet,
  fieldStreetNumber,
  fieldFloor,
  fieldBetweenSt1,
  fieldBetweenSt2,
  fieldPhoneNumber,
  
  fieldUserPicture
];
*/
module.exports = [
  fieldName,
  fieldLocality,
  fieldPostal,
  fieldStreet,
  fieldStreetNumber,
  fieldFloor,
  fieldBetweenSt1,
  fieldBetweenSt2,
  fieldPhoneNumber,
  fieldIndications
];
