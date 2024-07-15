const { validationResult } = require("express-validator");
const db = require("../../dataBase/models");

module.exports = (req, res) => {
  const errors = validationResult(req);
  const { id } = req.params;

  if (errors.isEmpty()) {
    const { name, description } = req.body;
    db.category
      .update(
        {
          name: name?.trim(),
          description: description
            ? description.trim()
            : "Este juguete no cuenta con una descripcion", 
        },
        {
          where: {
            id,
          },
        }
      )
      .then(() => {
        //return res.redirect("/categorias/lista-categorias");
        return res.redirect(`/categorias/editar-categoria/${id}?success=true`);
      })
      .catch((error) => {
        return res.status(500).send("Hubo un error al actualizar la categoría");
      });
  } else {
    const errorsMapped = errors.mapped();
    db.category
      .findByPk(id)
      .then((category) => {
        if (!category) {
          return res.status(404).send("Categoría no encontrada");
        }
        res.render("categories/editCategory", {
          category,
          errors: errorsMapped,
          old: req.body,
        });
      })
      .catch((error) => {        
        return res.status(500).send("Hubo un error al buscar la categoría");
      });
  }
};
