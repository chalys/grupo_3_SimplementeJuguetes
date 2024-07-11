const db = require("../../dataBase/models");

module.exports = (req, res) => {
  const page = parseInt(req.query.page) || 1; // Página por defecto es la primera
  const pageSize = parseInt(req.query.pageSize) || 5; // Cantidad de productos por página

  db.user.findAndCountAll({
   // where: {
    //  available: true,
   // },
    limit: pageSize,
    offset: (page - 1) * pageSize,
  }).then((result) => {
    const users = result.rows;
    const itemCount = result.count;
    const pageCount = Math.ceil(itemCount / pageSize);

    res.render("authentication/listUser", {
      users,
      pageCount,
      itemCount,
      currentPage: page,
      pageSize
    });
  });
};