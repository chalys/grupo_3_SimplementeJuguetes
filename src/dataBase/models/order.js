"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      order.belongsToMany(models.product, {
        through: "orderproducts",
        foreignKey: "orderId",
        otherKey: "productId",
        as: "products",
      });
      order.belongsTo(models.user, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  order.init(
    {
      total: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      userId: DataTypes.INTEGER,
      state: {
        type: DataTypes.STRING,
        validate: {
          isIn: {
            args: [["completed", "pending", "canceled"]],
            msg: "Los valores válidos de estado son 'completed', 'pending','canceled'",
          },
        },
        defaultValue: "pending",
      },
    },
    {
      sequelize,
      modelName: "order",
      paranoid:true,
    }
  );
  return order;
};