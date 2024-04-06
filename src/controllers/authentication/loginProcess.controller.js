const { compareSync } = require("bcryptjs");
const {loadData} = require("../../dataBase");
module.exports = (req, res) => { 

    //Login
   
    const { nombre, contraseña, recuerdame } = req.body;
   const user = loadData("usuarios");

   if(!nombre){
      return res.send("Debe ingresar su usuario")
   }
   const userFind = user.find(u => u.nombre === nombre.toLowerCase())

   if(!userFind){
      return res.send("El usuario no existe")
   }

   const passValid = compareSync(contraseña, userFind.password)

   if(!passValid){
      return res.send("Usuario o contraseña incorrectos")
   }

   //Ingresar como usuario con session y recordar la session
const {userName, name, email, province, locality, postal, street, streetNumber, floor, betweenSt1, betweenSt2, phoneNumber, indications, userPicture} = userFind;
req.session.userLogin ={
   userName,
   name,
   email,
   password,
   province,
   locality,
   postal,
   street,
   streetNumber,
   floor,
   betweenSt1,
   betweenSt2,
   phoneNumber,
   indications,
   userPicture
}

if(recuerdame){ //remenber es una variable creada para representar un valor boleano.
   res.cookie("userLogin", req.session.userLogin, {maxAge: 360 })
}

res.redirect("/")
};