const { check, body } = require('express-validator')
const path = require('path')
const regExpFiles = /.png|.jpg|.jpeg|.webp|.gif/i;
const fieldUserName = check('userName')
  .notEmpty()
  .withMessage('<div><p>USUARIO</p><i class="fa-solid fa-triangle-exclamation"></i>Debe ingresar un nombre de usuario</div>')
  .bail()
  .isLength({ max: 45 })
  .withMessage('<div><p>USUARIO</p><i class="fa-solid fa-triangle-exclamation"></i>El nombre no debe ser mayor a 45 caracteres</div>')
  .bail()
  .isAlphanumeric("es-ES", { ignore: " " })
  .withMessage('<div><p>USUARIO</p><i class="fa-solid fa-triangle-exclamation"></i>El nombre debe ser alfanumerico</div>')
const fieldEmail = check('email')
  .notEmpty()
  .withMessage('<div><p>EMAIL</p><i class="fa-solid fa-triangle-exclamation"></i>Debe ingresar un correo</div>')
  .bail()
  .isEmail()
  .withMessage('<div><p>EMAIL</p><i class="fa-solid fa-triangle-exclamation"></i>Debe ingresar un correo valido</div>')
  .bail()
const fieldPassword = check('password')
  .notEmpty()
  .withMessage('<div><p>CONTRASEÑA</p><i class="fa-solid fa-triangle-exclamation"></i>Debe ingresar una contraseña</div>')
  .bail()
  .isAlphanumeric("es-ES")
  .withMessage('<div><p>CONTRASEÑA</p><i class="fa-solid fa-triangle-exclamation"></i> La contraseña debe ser alfanumerica y no contener espacios</div>')
  .bail()
  .isLength({ min: 8, max: 20 })
  .withMessage('<div><p>CONTRASEÑA</p><i class="fa-solid fa-triangle-exclamation"></i> La contraseña debe tener entre 8 y 20 caracteres</div>')

  const fieldImg = body("userPicture").custom(
    (value, { req }) => {
      const lengthImages = req.files?.userPicture?.length;
  
      if (!lengthImages) return true
      else {
        if (lengthImages > 1)
          throw new Error("<div><p>FOTO DE PERFIL</p><i class='fa-solid fa-triangle-exclamation'></i> Debes usar una unica imagen</div>");
  
        const extFile = path.extname(req.files.userPicture[0].originalname);
        const isFormatSuccess = regExpFiles.test(extFile);
  
        if (!isFormatSuccess)
          throw new Error("<div><p>FOTO DE PERFIL</p><i class='fa-solid fa-triangle-exclamation'></i> La imagen debe ser .png, .jpg, .jpeg, .webp o .gif</div>");
      }
      return true;
    }
  );

const fieldSTNum = check('streetNumber')
  .custom((value, { req }) => {
    const valor = req.body?.streetNumber
    if (valor == '') {
      return true
    } else {
      if (valor < 0) {
        throw new Error('<div><p>NUMERO DE CALLE</p><i class="fa-solid fa-triangle-exclamation"></i>El numero debe ser mayor que cero</div>')
      }
    }
    return true
  })


const fieldPhone = check('phoneNumber')
  .optional({ checkFalsy: true })
  .trim()
  .custom((value, { req }) => {
    if (value == '') {
      return true
    }
    return true
  })
  .isMobilePhone()
  .withMessage('<div><p>TELEFONO</p><i class="fa-solid fa-triangle-exclamation"></i>debe ser un telefono valido</div>')
// .custom((value, {req}) => {
//   const valor = req.body?.phoneNumber
//   if(valor == ''){
//     return true
//   }else{
//     if(valor < 0){
//       throw new Error('Debe ser un numero de telefono')
//     }
//   }
// })
const fieldFloor = check('floor')
  .custom((value, { req }) => {
    const valor = req.body?.floor
    if (valor == '') {
      return true
    } else {
      if (valor < 0) {
        throw new Error('<div><p>PISO</p><i class="fa-solid fa-triangle-exclamation"></i>El numero debe ser mayor que cero</div>')
      }
    }
    return true
  })
const fieldPostal = check('postal')
  .custom((value, { req }) => {
    const valor = req.body?.postal
    if (valor == '') {
      return true
    } else {
      if (valor < 0) {
        throw new Error('<div><p>POSTAL</p><i class="fa-solid fa-triangle-exclamation"></i>El numero debe ser mayor que cero</div>')
      }
    }
    return true
  })

const fieldName = check('name')
  .optional({ checkFalsy: true })
  .trim()
  .custom((value, { req }) => {
    if (value == '') {
      return true
    }
    return true
  })
  .isAlphanumeric("es-ES", { ignore: " ", })
  .withMessage('<div><p>NOMBRE COMPLETO</p><i class="fa-solid fa-triangle-exclamation"></i>El nombre y apellido debe ser alfanumerico</div>')

const fieldProvince = check('province')
  .optional()
  .custom((value, { req }) => {
    const body = req.body
    const provinces = ["BA", "CA", "CH", 'CT', 'CB', 'CR', 'ALLÍ', 'FO', 'TU', 'ELEPÉ', 'LR', 'MZ', 'MI', 'NQ', 'RN', 'SA', 'SJ', 'SL', 'SC', 'SF', 'SE', 'TF', 'TU']

    if (body?.province) {
      const province = req.body?.province
      if (!province) return true
      else {
        if (!provinces.includes(province)) {
          throw new Error('<div><p>PROVINCIA</p><i class="fa-solid fa-triangle-exclamation"></i>La provincia debe estar en la lista</div>')
        }
      }
    }

    return true;
  })
const fieldConfirmPassword = check('confirmpassword')
  .notEmpty()
  .withMessage('<div><p>CONTASEÑA</p><i class="fa-solid fa-triangle-exclamation"></i>Debe confirmar la contraseña</div>')
  .bail()
  .custom((value, { req }) => {
    const originalPass = req.body?.password
    const confirmPass = req.body?.confirmpassword
    if (confirmPass == originalPass) {
      return true
    } else {
      if (confirmPass !== originalPass) {
        throw new Error('<div><p>CONTASEÑA</p><i class="fa-solid fa-triangle-exclamation"></i>Las contraseñas no coinciden</div>')
      }
    }
    return true
  })


module.exports = [fieldConfirmPassword, fieldName, fieldPostal, fieldFloor, fieldPhone, fieldProvince, fieldSTNum, fieldUserName, fieldEmail, fieldPassword, fieldImg]