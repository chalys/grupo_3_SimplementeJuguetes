const db = require("../../../dataBase/models");
module.exports = (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  db.category
    .update(
      {
        name: name?.trim(),
        description: description?.trim(),
      },
      {
        where: {
          id,
        },
      }
    )
    .then(() => {
      res.status(200).json({
        ok: true,
        msg: "Categoría actualizada con éxito",
      });
    });
};
