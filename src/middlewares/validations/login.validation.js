const {check}= require ("express-validator");

fiedlname =
check("nombre")
.notEmpty() .withMessage("ingresa el nombre").bail()
 .isLength({min:3,max:15}).withMessage("cantidad de caracteres es incorrecta").bail()
 .isAlpha().withMessage("el nombre no puede contener numeros ni caracteres especiales").bail()
 ;
 fiedlpassword= check("contrasenia")
 .notEmpty() .withMessage("ingresa el la contraseña").bail();
 




module.exports =[
    fiedlname,fiedlpassword
]