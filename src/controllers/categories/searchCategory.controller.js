const db = require("../../dataBase/models");
module.exports = async (req, res) => {
  const { keywords } = req.query;
  const page = parseInt(req.query.page) || 1; // Página por defecto es la primera
  const pageSize = parseInt(req.query.pageSize) || 8; // Cantidad de productos por página
  
  try {
    const result = await db.category.findAndCountAll({
      where: {
        //available: true,
        [db.Sequelize.Op.or]: [
          db.Sequelize.where(db.Sequelize.fn('LOWER', db.Sequelize.col('name')), 'LIKE', `%${keywords.toLowerCase()}%`),
          db.Sequelize.where(db.Sequelize.fn('LOWER', db.Sequelize.col('description')), 'LIKE', `%${keywords.toLowerCase()}%`)
        ]
      },
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });
    const categories = result.rows;
    const itemCount = result.count;
    const pageCount = Math.ceil(itemCount / pageSize);   
      res.render("categories/listCategory", {
        categories,
        keywords,      
        pageCount,
        itemCount,
        currentPage: page,
        pageSize
      });
  } catch (error) {   
    res.status(500).send("Error al recuperar categorias");
  }
};