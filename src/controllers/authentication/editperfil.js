const { baseDatos } = require("../../dataBase/models");

module.exports = (req, res) => {
  const { id } = req.params;

  // Buscar provincia y usuario simultáneamente
  Promise.all([
    baseDatos.province.findAll(),
    baseDatos.user.findByPk(id)
  ])
    .then(([provinces, user]) => {
      res.render("./authentication/editUser", {
        user: user,
        province: provinces,
      });
    })
    .catch((err) => {
      console.error("Error al buscar usuario y provincia:", err);
      res.status(500).send("Error interno del servidor");
    });
};
