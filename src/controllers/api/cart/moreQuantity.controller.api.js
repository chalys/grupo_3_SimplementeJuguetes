const { Op } = require("sequelize");
const db = require("../../../dataBase/models");
const { getOrderPending, getTotalOrder  } = require("../../utils");
//const getTotalOrder = require("../../utils/getTotalOrder");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    let [order, isCreate] = await getOrderPending(req);

    const record = await db.orderproduct.findOne({
      where: {
        [Op.and]: [
          {
            orderId: order.id,
          },
          {
            productId: id,
          },
        ],
      },
    });

    record.quantity++;
    await record.save();

    order = await order.reload({
      include: [
        {
          association: "products",
          through: {
            attributes: ["quantity"],
          },
        },
      ],
    });
    const total = getTotalOrder(order.products);
    order.total = total;

    await order.save();

    res.status(200).json({
      ok: true,
      msg: "Cantidad aumentada con éxito",
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error.message,
    });
  }
};
