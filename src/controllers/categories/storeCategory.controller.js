const { validationResult } = require("express-validator");
const db = require("../../dataBase/models");

module.exports = (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { name, description } = req.body;
    db.category
      .create({
        name: name?.trim(),
        description: description
          ? description.trim()
          : "Este juguete no cuenta con una descripcion",
      })
      .then(() => {
        //return res.redirect("/categorias/lista-categorias");
        return res.redirect("/categorias/crear-categoria?success=true");
      }).catch((error) => {
        return res.status(500).send("Hubo un error al registrar la categoría");
      });
  } else {
    const old = req.body;
    const errorsMapped = errors.mapped();
    return res.render("categories/addCategory", {
      errors: errorsMapped,
      old,
    });
  }
};
