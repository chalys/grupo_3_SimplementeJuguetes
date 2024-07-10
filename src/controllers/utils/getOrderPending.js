const { Op } = require("sequelize");
const db = require("../../dataBase/models");

module.exports = async (req) => {
  const dataOrder = await db.order.findOrCreate({
    where: {
      [Op.and]: [
        {
          //userId: req.query.userId,
          userId: req.session.userLogin?.id||req.query.userId,
        },
        {
          state: "pending",
        },
      ],
    },
    defaults: {
      //userId: req.query.userId,
      userId: req.session.userLogin?.id||req.query.userId,
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
