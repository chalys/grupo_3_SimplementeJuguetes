const db = require("../../../dataBase/models");
const sequelize = require("sequelize");
const getOriginUrl = require("../../utils/getOriginUrl");

module.exports = async (req, res) => {
  try {
    let offset = req.query.offset ? +req.query.offset : 1;

    // Consulta para obtener productos paginados con sus categorías
    const { docs, total, pages } = await db.product.paginate({
      attributes: [
        "id",
        "name",
        "description",
        [
          sequelize.fn(
            "CONCAT",
            `${getOriginUrl(req)}/api/products/`,
            sequelize.col("Product.id")
          ),
          "detail",
        ],
      ],
      include: [
        {
          model: db.category,
          as: "Category",
          attributes: ["name"],
        },
      ],
      page: offset,
      paginate: 10,
    });

    // Contar productos por categoría
    const categoryCounts = {};
    docs.forEach((product) => {
      const categoryName = product.Category
        ? product.Category.name
        : "Sin Categoría";
      if (!categoryCounts[categoryName]) {
        categoryCounts[categoryName] = 1;
      } else {
        categoryCounts[categoryName]++;
      }
    });

    const countByCategory = Object.keys(categoryCounts).map((categoryName) => ({
      category: {
        name: categoryName,
        count: categoryCounts[categoryName],
      },
    }));

    return res.status(200).json({
      count: total,
      countByCategory,
      products: docs,
      next:
        offset < pages
          ? `${getOriginUrl(req)}/api/products/?offset=${offset + 1}`
          : pages === 1
          ? "-"
          : "Last page",
      previous:
        offset > 1
          ? `${getOriginUrl(req)}/api/products/?offset=${offset - 1}`
          : pages === 1
          ? "-"
          : "First page",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error interno del servidor",
      message: error.message,
    });
  }
};
