// module.exports = (req, res) =>{
//     const products=require("../../dataBase/products.json")
//     res.render("listProduct",{
//         products
//     })
// }



const db = require("../../dataBase/models");

module.exports = (req, res) => {
  const page = parseInt(req.query.page) || 1; // Página por defecto es la primera
  const pageSize = parseInt(req.query.pageSize) || 5; // Cantidad de productos por página

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

    res.render("admin/listProduct", {
      products,
      pageCount,
      itemCount,
      currentPage: page,
      pageSize
    });
  });
};