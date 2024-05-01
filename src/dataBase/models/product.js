'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  product.init({
    name: DataTypes.STRING(100),
    allowNull: false,
    manufacturer: DataTypes.STRING(50),
    allowNull: false,
    mark: DataTypes.STRING(50),
    allowNull: false,
    sku: DataTypes.INTEGER,
    allowNull: false,
    available: DataTypes.BOOLEAN,
    allowNull: false,
    colection: DataTypes.STRING(50),
    allowNull: false,
    price: DataTypes.DECIMAL(10,2),
    allowNull: false,
    line: DataTypes.STRING(50),
    allowNull: false,
    character: DataTypes.STRING(50),
    allowNull: false,
    characterVersion: DataTypes.STRING(50),
    allowNull: false,
    minAge: DataTypes.STRING(30),
    allowNull: false,
    height: DataTypes.SMALLINT,
    depth: DataTypes.SMALLINT,
    width: DataTypes.SMALLINT,
    materials: DataTypes.STRING(50),
    allowNull: false,
    scale: DataTypes.STRING(30),
    allowNull: false,
    articulated: DataTypes.BOOLEAN,
    collectable: DataTypes.BOOLEAN,
    accessories: DataTypes.BOOLEAN,
    bobblehead: DataTypes.BOOLEAN,
    firstImg: DataTypes.STRING(100),
    allowNull: false,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};