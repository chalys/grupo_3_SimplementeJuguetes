const db = require("../../dataBase/models");

module.exports = (req, res) => {
  const { id } = req.params;

  db.secondaryimage.destroy({
    where: {
      productId: id,
    },
  }).then(() => {
    db.product.destroy({
      where: {
        id,
      },
    }).then(() => {
      res.redirect("/admin/lista-productos");
    });
  });
};
