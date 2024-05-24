const db = require("../../../dataBase/models");
module.exports = (req, res) => {
  const { name } = req.body;
  db.category
    .create({
      name: name.trim(),
    })
    .then(() => {
      res.status(201).json({
        ok: true,
        msg: "Categoría creada con éxito",
      });
    })
    .catch((err) => {
      res.status(500).json({
        ok: false,
        msg: err.message,
      });
    });
};
