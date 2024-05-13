"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class secondaryimage extends Model {

    static associate(models) {
      // secondaryimage.belongsTo(models.product, {
      //   foreignKey: "productId",
      //   onDelete: "CASCADE",
      // });
    }
    
  }
  secondaryimage.init(
    {
      file: DataTypes.STRING,
      productId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "secondaryimage",
      //tableName:"secondaryimages",
      timestamps: false,
      onDelete: "CASCADE",
    }
  );
  return secondaryimage;
};
