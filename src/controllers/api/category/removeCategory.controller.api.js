const db = require("../../../dataBase/models");

module.exports = (req, res) => {
  const { id } = req.params;
   
    db.category.destroy({
      where: {
        id,
      },
    })
      .then(() => {
        res.status(200).json({
          ok: true,
          msg: "Categoría eliminada con éxito",
        });
      })
      .catch((err) => {
        res.status(500).json({
          ok: false,
          msg: err.message,
        });
      });
  }
