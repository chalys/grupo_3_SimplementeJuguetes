// const { loadData } = require("../../dataBase");

// const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

// module.exports = (req, res) => {
//   const { keywords } = req.query;
//   const products = loadData("products");
//   const productsFilter = products.filter(
//     (p) => p.name.toLowerCase().includes(keywords.toLowerCase()) || p.description.toLowerCase().includes(keywords.toLowerCase()) /* investigar expresiones regulares*/
//   );
//   res.render("other/result", {
//     products: productsFilter,
//     keywords,
//     toThousand
//   });
// };


const db = require("../../dataBase/models");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
module.exports = (req, res) => {
  const { keywords } = req.query;  
  db.product.findAll({
    where: {
      [db.Sequelize.Op.or]: [
        db.Sequelize.where(db.Sequelize.fn('LOWER', db.Sequelize.col('name')), 'LIKE', `%${keywords.toLowerCase()}%`),
        db.Sequelize.where(db.Sequelize.fn('LOWER', db.Sequelize.col('description')), 'LIKE', `%${keywords.toLowerCase()}%`)
      ]
    }
  }).then((products) => {
    res.render("products/list", {
      products,
      keywords,
      toThousand
    });
  });
};