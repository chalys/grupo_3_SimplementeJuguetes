const db = require("../../../dataBase/models");
const { literal } = require("sequelize");
const getOriginUrl = require("../../utils/getOriginUrl");
const { ErrorCustom } = require("../../utils/createError");

module.exports = async (req, res) => {
  try {

  const {page = "1", limit = "5"} = req.query

  if (isNaN(+page) || isNaN(+limit))
    throw new ErrorCustom(400, "El formato de página o límite no es válido");

  const { docs: products, pages, total } = await db.product.paginate({
    page: +page,
    paginate: +limit,
    include: [
      {
        association: "secondaryImage",
        attributes: {
          include: [
            [
              literal(`CONCAT('${getOriginUrl(req)}/api/products/', file)`),
              "secondImg_url",
            ]
          ],
        },
      },
      {
        association: "Category",
      },
    ],
    attributes: {
      exclude: ["createdAt", "updatedAt"],
      include: [
        [
          literal(
            `CONCAT('${getOriginUrl(req)}/api/products/', firstImg)`
          ),
          "firstImg_url",
        ],
        [
          literal(`CONCAT('${getOriginUrl(req)}/productos/detalle/', product.id)`),
          "detail"
        ]
      ],
    },
  })
   

      const nextPage = pages === +page || page > pages ? null : +page + 1;
      const previosPage = page > 1 || +page === pages ? +page - 1 : null

      return res.status(200).json({
        ok: true,
        pages,
        total,
        next: nextPage ? getOriginUrl(req) + "/api/products?page=" + nextPage : null,
        prev: previosPage ? getOriginUrl(req) + "/api/products?page=" + previosPage : null,
        data: products,
      });
   
    } catch(err) {
      res.status(err.status || 500).json({
        ok: false,
        msg: err.message
      })
    }
    
};

















/*
const db = require("../../../dataBase/models");
const sequelize = require("sequelize");
const getOriginUrl = require("../../utils/getOriginUrl");

module.exports = async (req, res) => {
  try {
    let offset = req.query.offset ? +req.query.offset : 1;

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
*/