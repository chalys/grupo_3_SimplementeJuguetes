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

module.exports = async (req, res) => {
  const { keywords } = req.query;
  const page = parseInt(req.query.page) || 1; // Página por defecto es la primera
  const pageSize = parseInt(req.query.pageSize) || 8; // Cantidad de productos por página
  
  try {
    const result = await db.product.findAndCountAll({
      where: {
        available: true,
        [db.Sequelize.Op.or]: [
          db.Sequelize.where(db.Sequelize.fn('LOWER', db.Sequelize.col('name')), 'LIKE', `%${keywords.toLowerCase()}%`),
          db.Sequelize.where(db.Sequelize.fn('LOWER', db.Sequelize.col('description')), 'LIKE', `%${keywords.toLowerCase()}%`)
        ]
      },
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    const products = result.rows;
    const itemCount = result.count;
    const pageCount = Math.ceil(itemCount / pageSize);

    res.render("products/list", {
      products,
      keywords,
      toThousand,
      pageCount,
      itemCount,
      currentPage: page,
      pageSize
    });
  } catch (error) {   
    res.status(500).send("Error al recuperar productos");
  }
};