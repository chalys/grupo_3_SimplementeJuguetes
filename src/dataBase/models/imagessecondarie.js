'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class imagessecondarie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  imagessecondarie.init({
    file: DataTypes.STRING,
    idProduct: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'imagessecondarie',
  });
  return imagessecondarie;
};