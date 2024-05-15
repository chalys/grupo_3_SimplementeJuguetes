'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orderproduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  orderproduct.init({
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: {
      //type:DataTypes.INTEGER,
      type: DataTypes.DECIMAL,
      defaultValue:1
    }
  }, {
    sequelize,
    modelName: 'orderproduct',
  });
  return orderproduct;
};