const { loadData } = require("../../dataBase");
const { compareSync } = require("bcryptjs");
module.exports = (req, res) => { 

    //Login
   
   const { name, password, recuerdame } = req.body; // Cambiar 'nombre' a 'name'
   const user = loadData("usuarios");

   if(!name){ // Cambiar 'nombre' a 'name'
      res.render("./authentication/errorAuth", 
      {mensage: "Debe ingresar su usuario",
       boton: "Intente nuevamente", 
       redireccion: "/autenticacion/login"
      });
   }
   const userFind = user.find(u => u.userName === name)//.toLowerCase()) // Cambiar 'nombre' a 'name'

   if(!userFind){
      res.render("./authentication/errorAuth",
       {mensage: "El usuario no existe",
       boton: "Registrese para continuar", 
       redireccion: "/autenticacion/registro"
      
      
      });
   }

   const passValid = compareSync(password, userFind.password)

   if(!passValid){
      res.render("./authentication/errorAuth",
      {mensage: "El usuario o contraseña son incorrectos",
      boton: "Intente nuevamente", 
      redireccion: "/autenticacion/login"
      });
   }

   //Ingresar como usuario con session y recordar la session
const {userName, email, province, locality, postal, street, streetNumber, floor, betweenSt1, betweenSt2, phoneNumber, indications, userPicture} = userFind;
req.session.userLogin ={
   userName,
   name, // Esta es la variable 'name' que proviene de 'userFind'
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
