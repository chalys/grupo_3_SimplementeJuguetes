"use strict";
const sequelizePaginate = require("sequelize-paginate")
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product.hasMany(models.secondaryimage, {
        foreignKey: "productId",
        as: "secondaryImage",
      });

      product.belongsTo(models.category, {
        foreignKey: "categoryId",
        as: "Category" //"category"
      })
      product.belongsToMany(models.order,{
        through:"orderproducts",
        foreignKey:"productId",
        otherKey: "orderId",
        as:"orders"
      })
    }
  }
  product.init(
    {
      name: DataTypes.STRING,
      manufacturer: DataTypes.STRING,
      mark: DataTypes.STRING,
      sku: DataTypes.INTEGER,
      available: DataTypes.BOOLEAN,
      collection: DataTypes.STRING,
      stock:DataTypes.INTEGER,
      categoryId:DataTypes.INTEGER,
      price: DataTypes.DECIMAL,
      line: DataTypes.STRING,
      character: DataTypes.STRING,
      characterVersion: DataTypes.STRING,
      minAge: DataTypes.STRING,
      height: DataTypes.SMALLINT,
      depth: DataTypes.SMALLINT,
      width: DataTypes.SMALLINT,
      materials: DataTypes.STRING,
      scale: DataTypes.STRING,
      articulated: DataTypes.BOOLEAN,
      collectable: DataTypes.BOOLEAN,
      accessories: DataTypes.BOOLEAN,
      bobbleHead: DataTypes.BOOLEAN,
      firstImg: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "product",
      //tableName:"products",
      onDelete: "CASCADE",
      paranoid: true,
    }
  );
  sequelizePaginate.paginate(product)
  return product;
};
