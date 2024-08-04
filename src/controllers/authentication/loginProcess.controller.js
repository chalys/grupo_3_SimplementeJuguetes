// const { loadData } = require("../../dataBase");
const db = require("../../dataBase/models");
const { compareSync } = require("bcryptjs");
module.exports = (req, res) => {
  //Login

  const { userName, password, recuerdame } = req.body; // Cambiar 'nombre' a 'name'
  // const user = loadData("usuarios");

  if (!userName) {
    // Cambiar 'nombre' a 'name'
    return res.render("./authentication/errorAuth", {
      mensage: "Debe ingresar su usuario",
      boton: "Intente nuevamente",
      redireccion: "/autenticacion/login",
    });
  }
  // const userFind = user.find(u => u.userName === name)//.toLowerCase()) // Cambiar 'nombre' a 'name'
  db.user
    .findOne({ where: { userName } })
    .then((userFind) => {
      if (!userFind) {
        return res.render("./authentication/errorAuth", {
          mensage: "El usuario no existe",
          boton: "Registrese para continuar",
          redireccion: "/autenticacion/registro",
        });
      }
      const passValid = compareSync(password, userFind.password);
      if (!passValid) {
        return res.render("./authentication/errorAuth", {
          mensage: "El usuario o contraseña son incorrectos",
          boton: "Intente nuevamente",
          redireccion: "/autenticacion/login",
        });
      }
      //Ingresar como usuario con session y recordar la session
      const {
        id,
        name,
        roleId,
        userName,
        email,
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
        userPicture,
      } = userFind;
      req.session.userLogin = {
        id,
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
        userPicture,
        roleId,
      };
      if (recuerdame) {
        //remenber es una variable creada para representar un valor boleano.
        res.cookie("userLogin", req.session.userLogin, { maxAge: 6000 * 30 });
      }
      res.redirect("/");
    })
    .catch((err) => res.send(err.message));
};
