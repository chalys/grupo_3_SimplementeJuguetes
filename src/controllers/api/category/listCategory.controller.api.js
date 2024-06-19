const db = require("../../../dataBase/models");
const { literal } = require("sequelize");
const getOriginUrl = require("../../utils/getOriginUrl");
const { ErrorCustom } = require("../../utils/createError");

module.exports = async (req, res) => {
  try {
    const { page = "1", limit = "5" } = req.query;

    if (isNaN(+page) || isNaN(+limit))
      throw new ErrorCustom(400, "El formato de página o límite no es válido");

    const {
      docs: category,
      pages,
      total,
    } = await db.category.paginate({
      page: +page,
      paginate: +limit,
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      },
    });
    const nextPage = pages === +page || page > pages ? null : +page + 1;
    const previosPage = page > 1 || +page === pages ? +page - 1 : null;

    return res.status(200).json({
      ok: true,
      pages,
      total,
      next: nextPage
        ? getOriginUrl(req) + "/api/category?page=" + nextPage
        : null,
      prev: previosPage
        ? getOriginUrl(req) + "/api/category?page=" + previosPage
        : null,
      data: category,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      ok: false,
      msg: err.message,
    });
  }
};
