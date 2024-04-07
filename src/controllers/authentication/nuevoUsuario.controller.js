const { loadData, saveData } = require("../../dataBase");
const { validationResult } = require("express-validator");
const bc = require('bcryptjs')
module.exports = (req,res)=>{
    const errors = validationResult(req)

    if(errors.isEmpty()){
    const {userName,name,email,password,province,locality,postal,street,streetNumber,floor,betweenSt1,betweenSt2,phoneNumber,indications,} = req.body
    
    const usuarios = loadData("usuarios");
    const nuevaid = usuarios[usuarios.length - 1].id + 1;
    const nuevoUsuario = {
        id: nuevaid,
        userName: userName.trim(),
        name: name?.trim(),
        email: email.trim(),
        password: bc.hashSync(password.trim(),10),
        province: province?.trim(),
        locality: locality?.trim(),
        postal: postal? +postal: null,
        street: street?.trim(),
        streetNumber: streetNumber? +streetNumber: null,
        floor: floor? +floor: null,
        betweenSt1: betweenSt1?.trim(),
        betweenSt2: betweenSt2?.trim(),
        phoneNumber: phoneNumber? +phoneNumber: null,
        indications: indications?.trim(),
        userPicture: req.files.userPicture?.length? req.files.userPicture[0]?.filename : "default.png"
    }
    usuarios.push(nuevoUsuario);
    saveData(usuarios,"usuarios")
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