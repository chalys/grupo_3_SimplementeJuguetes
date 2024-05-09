"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class secondaryimage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define la asociación con el modelo Product
      secondaryimage.belongsTo(models.product, {
        foreignKey: "productId",
        onDelete: "CASCADE",
      });
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
      tableName:"secondaryimages",
      timestamps: false,
      onDelete: "CASCADE",
    }
  );
  return secondaryimage;
};
