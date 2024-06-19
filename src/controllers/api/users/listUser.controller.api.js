const { literal } = require("sequelize");
const db = require("../../../dataBase/models");
const { ErrorCustom } = require("../../utils/createError");
const getOriginUrl = require("../../utils/getOriginUrl");
module.exports = async (req, res) => {
  try {
    const { page = "1", limit = "5" } = req.query;
    if (isNaN(+page) || isNaN(+limit))
      throw new ErrorCustom(400, "El formato de página o límite no es válido");

    const {
      docs: users,
      pages,
      total,
    } = await db.user.paginate({
      page: +page,
      paginate: +limit,
      include: [
        {
          association: "Role",
          attributes: [ "id","role"],
        }
      ],
      attributes: {
        exclude: ["createdAt", "deletedAt", "updatedAt", "password"],
        include: [
          [
            literal(`CONCAT('${getOriginUrl(req)}/api/users/', userPicture)`),
            "userPicture_url",
          ],
        ],
      },
    });

    const nextPage = pages === +page || page > pages ? null : +page + 1;
    const previosPage = page > 1 || +page === pages ? +page - 1 : null;

    return res.status(200).json({
      ok: true,
      pages,
      total,
      next: nextPage
        ? getOriginUrl(req) + "/api/users?page=" + nextPage
        : null,
      prev: previosPage
        ? getOriginUrl(req) + "/api/users?page=" + previosPage
        : null,
      data: users,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      ok: false,
      msg: error.message,
    });
  }
};



/*const db = require("../../../dataBase/models");
const sequelize = require("sequelize");
const getOriginUrl = require("../../utils/getOriginUrl");

module.exports = async (req, res) => {

    try {

        let offset = req.query.offset ? +req.query.offset : 1
        const { docs, pages, total } =
            await db.user
                .paginate({
                    attributes: [
                        "id",
                        "name",
                        "email",
                       [sequelize.fn("CONCAT", `${getOriginUrl(req)}/api/users/`, sequelize.col("id")), "detail"]],
                    page: offset,
                    paginate: 10
                })
        return res.status(200).send({
            ok: true,
            count: total,
            users: docs,
            page: offset ? offset : 1,
            next: offset < pages ? `${getOriginUrl(req)}/api/users?offset=${offset + 1}` : (pages === 1 ? "-" : "Last page"),
            previous: offset > 1 ? `${getOriginUrl(req)}/api/users?offset=${offset - 1}` : (pages === 1 ? "-" : "First page")
        })


    } catch (error) {

        res.status(500).json({
            error: "Error interno del servidor",
            message: error.message
        });
    }
};
*/