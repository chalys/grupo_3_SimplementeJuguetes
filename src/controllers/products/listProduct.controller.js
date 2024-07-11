// const fs = require('fs');
// const path = require('path');
// module.exports = (req, res) =>{
//     const searchJSON = path.join(__dirname,"../../dataBase/products.json")
//     let products = JSON.parse(fs.readFileSync(searchJSON, 'utf-8'))
//     res.render("./products/listProduct",{
//       products: products,
//     })
// }

const db = require("../../dataBase/models");

module.exports = (req, res) => {
  const page = parseInt(req.query.page) || 1; // Página por defecto es la primera
  const pageSize = parseInt(req.query.pageSize) || 8; // Cantidad de productos por página

  db.product.findAndCountAll({
    where: {
      available: true,
    },
    limit: pageSize,
    offset: (page - 1) * pageSize,
  }).then((result) => {
    const products = result.rows;
    const itemCount = result.count;
    const pageCount = Math.ceil(itemCount / pageSize);

    res.render("products/list", {
      products,
      pageCount,
      itemCount,
      currentPage: page,
      pageSize
    });
  });
};