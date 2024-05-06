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
    
    manufacturer: DataTypes.STRING(50),
    
    mark: DataTypes.STRING(50),
    
    sku: DataTypes.INTEGER,
    
    available: DataTypes.BOOLEAN,
    
    colection: DataTypes.STRING(50),
    
    price: DataTypes.DECIMAL(10,2),
    
    line: DataTypes.STRING(50),
    
    character: DataTypes.STRING(50),
    
    characterVersion: DataTypes.STRING(50),
    
    minAge: DataTypes.STRING(30),
    
    height: DataTypes.SMALLINT,
    depth: DataTypes.SMALLINT,
    width: DataTypes.SMALLINT,
    materials: DataTypes.STRING(50),
    
    scale: DataTypes.STRING(30),
    
    articulated: DataTypes.BOOLEAN,
    collectable: DataTypes.BOOLEAN,
    accessories: DataTypes.BOOLEAN,
    bobblehead: DataTypes.BOOLEAN,
    firstImg: DataTypes.STRING(100),
    
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};