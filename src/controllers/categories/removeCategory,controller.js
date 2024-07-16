const db = require("../../dataBase/models");

module.exports = (req, res) => {
  const { id } = req.params;
  db.category
    .destroy({
      where: {
        id,
      },
    })
    .then(() => {
      res.redirect("/categorias/lista-categorias?success=true");
    })
    .catch((error) => {
      return res.status(500).send("Hubo un error al eliminar la categoría");
    });
};
