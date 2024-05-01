// const { loadData, saveData } = require("../../dataBase");
const db = require('../../dataBase/models')
const { validationResult } = require("express-validator");
const bc = require('bcryptjs')
module.exports = (req,res)=>{
    const errors = validationResult(req)

    if(errors.isEmpty()){
    const {userName,name,email,password,province,locality,postal,street,streetNumber,floor,betweenSt1,betweenSt2,phoneNumber,indications,} = req.body
    
    // const usuarios = loadData("usuarios");
    // const nuevaid = usuarios[usuarios.length - 1].id + 1;
    db.user.create( {
        userName: userName.trim(),
        name: name?name.trim():null,
        email: email.trim(),
        password: bc.hashSync(password.trim(),10),
        province: province?+province:null,
        locality: locality?locality.trim():null,
        postal: postal? +postal: null,
        street: street?street.trim():null,
        streetNumber: streetNumber? +streetNumber: null,
        floor: floor? +floor: null,
        betweenSt1: betweenSt1?betweenSt1.trim():null,
        betweenSt2: betweenSt2?betweenSt2.trim():null,
        phoneNumber: phoneNumber? +phoneNumber: null,
        indications: indications?indications.trim():null,
        userPicture: req.files.userPicture?.length? req.files.userPicture[0]?.filename : "default.png",
        role: 1
    })
  
    // usuarios.push(nuevoUsuario);
    // saveData(usuarios,"usuarios")
    res.redirect("/autenticacion/registro-completado")
}else{
    const mapeoErroes = errors.mapped()
    // const errores = [mapeoErroes.userName,mapeoErroes.name,mapeoErroes.email,mapeoErroes.password,mapeoErroes.confirmpassword,mapeoErroes.province,mapeoErroes.locality,mapeoErroes.postal,mapeoErroes.street,mapeoErroes.streetNumber,mapeoErroes.floor,mapeoErroes.phoneNumber,mapeoErroes.userPicture]
    const old = req.body
    // return res.send(mapeoErroes)
    res.render("./authentication/registro",{
        errors: mapeoErroes,
        old: old,
    })
}
}