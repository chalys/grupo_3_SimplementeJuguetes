const db = require("../../../dataBase/models");
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
