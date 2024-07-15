const db = require("../../dataBase/models");

module.exports = async (req, res) => {

  try {
    //if (!req.session.userLogin) { return res.redirect("/") }

//    const id = req.session.userLogin.id;
    const id = req.params;
    //const categories = await db.Category.findAll();

    const user = await db.user.findByPk(id, { 
      include:[{ model: db.role, as: "role" }],
      attributes: {
        exclude: ['password']
     }
    })

    if (!user) { return res.status(404).send("Usuario no encontrado") }

    return res.render("authentication/editUser", { user });

  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    res.status(500).send("Error interno del servidor xx");
  }
}
/*
const db = require("../../dataBase/models");
const { validationResult } = require("express-validator");

module.exports = async (req, res) => {
  const errors = validationResult(req);
  const { id } = req.params;

  if (errors.isEmpty()) {
    const { name } = req.body;
    try {
      await db.user.update(
        {
          name: name?.trim(),
        },
        {
          where: {
            id,
          },
        }
      );
      res.redirect(`/perfil/${id}`);
    } catch (error) {
      console.error("Error actualizando el usuario:", error);
      res.status(500).send("Error interno del servidor");
    }
  } else {
    const errorsMapped = errors.mapped();
    try {
      const user = await db.user.findByPk(id);
      res.render("authentication/editUser", {
        user,
        errors: errorsMapped,
        old: req.body,
      });
    } catch (error) {
      console.error("Error obteniendo el usuario:", error);
      res.status(500).send("Error interno del servidor");
    }
  }
};*/