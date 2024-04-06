const { loadData } = require("../../dataBase");
const { compareSync } = require("bcryptjs");
module.exports = (req, res) => { 

    //Login
   
   const { name, contraseña, recuerdame } = req.body; // Cambiar 'nombre' a 'name'
   const user = loadData("usuarios");

   if(!name){ // Cambiar 'nombre' a 'name'
      return res.send("Debe ingresar su usuario")
   }
   const userFind = user.find(u => u.userName === name)//.toLowerCase()) // Cambiar 'nombre' a 'name'

   if(!userFind){
      return res.send("El usuario no existe")
   }

   const passValid = compareSync(contraseña, userFind.password)

   if(!passValid){
      return res.send("Usuario o contraseña incorrectos")
   }

   //Ingresar como usuario con session y recordar la session
const {userName, names, email, province, locality, postal, street, streetNumber, floor, betweenSt1, betweenSt2, phoneNumber, indications, userPicture} = userFind;
req.session.userLogin ={
   userName,
   name: names, // Esta es la variable 'name' que proviene de 'userFind'
   email,
   password, // Asegúrate de que esta variable esté definida en 'userFind'
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
