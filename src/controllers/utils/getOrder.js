const { Op } = require("sequelize");
const db = require("../../dataBase/models");

module.exports = async (req) => {
  const dataOrder = await db.order.findAll({
    where: {
      [Op.and]: [
        {
          userId: req.query.userId,
        },
        {
          state: req.query.state || "pending",
        },
      ],
    },
    include: [
      {
        association: "products",
        through: {
          attributes: ["quantity"],
        },
      },
    ],
  });
  // console.log(dataOrder)
  return dataOrder; // [order,isCreate]
};
