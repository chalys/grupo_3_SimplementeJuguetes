// const { loadData, saveData } = require("../../dataBase");
const db = require('../../dataBase/models')
const { validationResult } = require("express-validator");
const bc = require('bcryptjs')
module.exports = (req,res)=>{
    const errors = validationResult(req)
    // const {userName} = req.body

    // db.user.findOne({
    //     where: {userName}
    // }).then((u)=>{
    //     if(!u){
    //         return res.render("./authentication/errorAuth",
    //         {mensage: "El usuario ya existe",
    //         boton: "Intente nuevamente", 
    //         redireccion: "/autenticacion/registro"
    //         });
    //     }

        
    // })
    if (errors.isEmpty()) {
        const { userName, name, email, password, province, locality, postal, street, streetNumber, floor, betweenSt1, betweenSt2, phoneNumber, indications } = req.body;
    
        db.user.create({
            userName: userName.trim(),
            name: name ? name.trim() : null,
            email: email.trim(),
            password: bc.hashSync(password.trim(), 10),
            province: province ? province.trim() : null,  // Aquí está la corrección
            locality: locality ? locality.trim() : null,
            postal: postal ? +postal : null,
            street: street ? street.trim() : null,
            streetNumber: streetNumber ? +streetNumber : null,
            floor: floor ? +floor : null,
            betweenSt1: betweenSt1 ? betweenSt1.trim() : null,
            betweenSt2: betweenSt2 ? betweenSt2.trim() : null,
            phoneNumber: phoneNumber ? +phoneNumber : null,
            indications: indications ? indications.trim() : null,
            userPicture: req.files.userPicture?.length ? req.files.userPicture[0]?.filename : "default.png",
            role: 1
        })
        .then(() => {
            res.redirect("/autenticacion/registro-completado");
        })
        .catch((error) => {
            console.error("Error al crear el usuario:", error);
            res.status(500).send("Error interno del servidor");
        });
    } else {
        const mapeoErroes = errors.mapped();
        const old = req.body;
        res.render("./authentication/registro", {
            errors: mapeoErroes,
            old: old,
        });
    }
    
}